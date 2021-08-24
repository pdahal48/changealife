import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Paypal = ({amount, email}) => {

    const history = useHistory()
    const paypal = useRef()
    const [orderId, setOrderId] = useState('')
    const [donorName, setDonorName] = useState('')

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
                setDonorName(order.payer.name.given_name)
                handleSubmit()
            },
            onError: (err) => {
                console.log(err)
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
                  Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
          }}
        )
        payout.status === 201 
        ?   history.push('/people')
        : alert(payout)
    }

    return(
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default Paypal;


