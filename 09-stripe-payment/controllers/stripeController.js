const stripe = require('stripe')(process.env.STRIP_API_KEY)
const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  })
  res.status(200).json({ clientSecret: paymentIntent.client_secret })
}

module.exports = stripeController
