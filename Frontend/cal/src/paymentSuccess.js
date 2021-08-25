import React from 'react'
import { useLocation } from "react-router-dom";

const PaymentSuccessful = () => {
    const location = useLocation();
    const data = location.state

    return (
        <div className="mt-2 mb-5 text-center">
            <h1>Thank you for donating ${data.detail.amount} to {data.detail.username}</h1>
        </div>
    )
}

export default PaymentSuccessful;