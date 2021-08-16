import React from 'react'
import { useLocation } from "react-router-dom";

const PaymentSuccessful = () => {
    const location = useLocation();
    const data = location.state

    return (
        <div className="mt-2 mb-5 text-center">
            <h1>Thank you {data.detail.payer_name} for donating ${data.detail.amount} to {data.detail.username}</h1>
            <div>
                Payment was sent to {data.detail.email}
            </div>
        </div>
    )
}

export default PaymentSuccessful;