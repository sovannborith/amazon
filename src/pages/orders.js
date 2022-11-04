import { getSession, useSession } from "next-auth/react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import moment from "moment";
import Header from "../components/Header";
import db from "../../firebase";
import OrderItem from "../components/OrderItem";
function Orders({ orders }) {
  const session = useSession();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto p-10 bg-white">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session.data ? (
          <h2>{orders ? orders.length : 0} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({
              id,
              amount,
              amountShipping,
              amountTotal,
              items,
              images,
              timestamp,
            }) => (
              <OrderItem
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                amountTotal={amountTotal}
                items={items}
                images={images}
                timestamp={timestamp}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  if (!session) {
    return {
      props: {},
    };
  }
  const stripeOrders = await getDocs(
    query(
      collection(db, `users/${session?.user.email}/orders`),
      orderBy("timestamp", "desc")
    )
  );

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount_subtotal,
      amountShipping: order.data().amount_shipping,
      amountTotal: order.data().amount_total,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(), //moment().unix(),
      items:
        (await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        }).data) || [],
    }))
  );

  return {
    props: {
      orders: orders,
    },
  };
}
