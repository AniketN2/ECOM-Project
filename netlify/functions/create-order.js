const Razorpay = require("razorpay");

exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const order = await instance.orders.create({
      amount: body.amount * 100, // Convert to paise
      currency: body.currency,
      receipt: body.receipt,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(order),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create order", details: error }),
    };
  }
};
