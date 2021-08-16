import React from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import './CardInput.css'

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color:"red",
            fontFamily: '"helvetica Neue", "Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color:"#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",

        }
            }
        }

export default function cardInput() {
    return (
        <div>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
    )
}