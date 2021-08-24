const express = require('express')
const router = new express.Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)


router.post('/create-account', async (req, res) => {

  //create an account
  try {
    let account = await stripe.accounts.create({
    type: 'express',
    requested_capabilities: ['card_payments', 'transfers']
  });
    let accountLinks = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: 'https://example.com/reauth',
    return_url: 'https://example.com/return',
    type: 'account_onboarding',
  });
  } catch(e) {
    console.log(e)
    res.json({error: e})
    return;
  }
  res.json(accountLinks)
})


router.post('/', async (req, res) => {
    const {email, amount} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount*100),
      currency: 'usd',
      metadata: {integration_check: "accept_a_payment"},
      receipt_email: email
    });
    res.json({'client_secret': paymentIntent['client_secret']})
  });

module.exports = router;