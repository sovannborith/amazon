import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

import { AiOutlineStar } from "react-icons/ai";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const dispatch = useDispatch();

  const [hasPrime] = useState(Math.random() < 0.5);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
    };

    dispatch(addToBasket(product));
  };
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <div className="flex flex-col items-center">
        <Image
          src={image}
          height={200}
          width={200}
          object-fit="contain"
          alt=""
        />
      </div>
      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <AiOutlineStar key={i} className="w-6 h-6 text-yellow-600" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">{price}$</div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img src="https://links.papareact.com/fdw" alt="" className="w-12" />
          <p className="text-xs text-gray-500">FREE Next-day Deliver</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
