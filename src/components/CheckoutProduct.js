import { useState } from "react";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

import { AiOutlineStar } from "react-icons/ai";

const MAX_RATING = 5;
const MIN_RATING = 1;

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

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
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} width={200} height={200} objectFit="contain" alt="" />
      <div className="col-span-3 m-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <AiOutlineStar key={i} className="w-6 h-6 text-yellow-600" />
            ))}
        </div>
        <p className="tet-xs my-2 line-clamp-3">{description}</p>
        <p>{price}$</p>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              src="https://links.papareact.com/fdw"
              alt=""
              className="w-12"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="button">
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
