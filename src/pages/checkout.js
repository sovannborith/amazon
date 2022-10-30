import Image from "next/image";
import Header from "../components/Header";

import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";

function Checkout() {
  const apiKey = `${process.env.STRIPE_SECRET_KEY}`;
  console.log(apiKey);

  const stripePromise = loadStripe(apiKey);
  const items = useSelector(selectItems);
  const session = useSession();
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.data.user.email,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl m-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            alt=""
            object-fit="contain"
          />
          <div className="flex flex-col space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4 pl-2">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Your Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                product={item}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">{Math.round(total, 2)}$</span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session.data}
                className={`button mt-2 ${
                  !session.data &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session.data ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
