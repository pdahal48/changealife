import axios from 'axios'
import React, { useState } from 'react'

let querystring = require('querystring');

const Token = () => {
    const [token, setToken] = useState([]);

    async function handleSubmit() {
        const result = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token',
            querystring.stringify({'grant_type':'client_credentials'})
        ,
        {
        auth: {
                username: process.env.REACT_APP_USERNAME,
                password: process.env.REACT_APP_PASSWORD
            }
        })
        
        setToken(result.data.access_token)
    }
    return (
        <div>
            <h1> Token : {token}</h1>
            <button className="btn-warning" onClick={handleSubmit}>
                Get Token
            </button>
        </div>
    )
}


export default Token;