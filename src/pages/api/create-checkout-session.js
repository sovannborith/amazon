const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformItems = items.map((item) => ({
    quantity: 1,

    price_data: {
      currency: "usd",
      unit_amount: Math.round(item.price),
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: [
      {
        shipping_rate: "shr_1LyJYFJkf3qhSqb8POEikUWt",
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["KH", "US", "CA"],
    },
    line_items: transformItems,

    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
  });
  res.status(200).json({ id: session.id });
};
