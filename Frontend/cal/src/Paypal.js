import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const Paypal = ({amount, email}) => {
    const [orderId, setOrderId] = useState('')
    let token;
    const history = useHistory()
    const paypal = useRef()
    const { username } = useParams()

    //Getting a paypal token for future requests
    useEffect(() => {
        //regex simply removes the quotations from the string
        let CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID.replace(/['"]+/g, '')
        let SECRET_KEY = process.env.REACT_APP_PAYPAL_SECRET_KEY.replace(/['"]+/g, '')
        
        fetch('https://api.sandbox.paypal.com/v1/oauth2/token', { 
        method: 'POST',
        headers: { 
         'Accept': 'application/json', 
         'Accept-Language': 'en_US',
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${SECRET_KEY}`)
        },
    body: 'grant_type=client_credentials'

    }).then(response => response.json())
    .then(async (data) => {
        token = data.access_token;
    }).catch(function (error) {
        return (error);        
    })

    }, [token])


    //processing the donation
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Donation",
                            amount: {
                                currency_code: "USD",
                                value: amount
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await (actions.order.capture());
                setOrderId(order.id)
                handleSubmit()
            },
            onError: (err) => {
                return err;
            }
        }).render(paypal.current)
    }, [amount]);

    //function to process the payment transfer to the receipient 
    async function handleSubmit() {
        const payout = await axios.post('https://api-m.sandbox.paypal.com/v1/payments/payouts', {
                "sender_batch_header": {
                  "sender_batch_id": orderId,
                  "recipient_type": "EMAIL",
                  "email_subject": "You have money!",
                  "email_message": "You received a payment. Thanks for using our service!"
                },
                "items": [
                    {
                        "amount": {
                        "value": amount,
                        "currency": "USD"
                        },
                        "sender_item_id": "201403140001",
                        "recipient_wallet": "PAYPAL",
                        "receiver": email
                    }]
              },{
                headers: {
                  Authorization: `Bearer ${token}`
                }}
            )
        payout.status === 201 
        ?   history.push({
                pathname: '/payment/success',
                state: {detail: {
                    username: username,
                    amount: amount,
                }}
            })

        : alert(payout)
    }

    return(
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default Paypal;


