import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {CalAPI as API} from './Api'

import axios from 'axios';
// MUI Components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
// stripe
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
// Util imports
import {makeStyles} from '@material-ui/core/styles';
// Custom Components
import CardInput from './CardInput';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginTop: '10px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    marginTop:"15px"
  },
  button: {
    margin: '0em auto 1em',
  },
  firstName: {
    marginRight: '15px',
  },
  lastName: {
      marginLeft: '15px'
  },
  amount: {
    marginLeft: '15px'
}
  
});

const Payment = () => {
  const classes = useStyles();
  // States
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [amount, setAmount] = useState('');

  const [user, setUser] = useState([])
  const history = useHistory()

  const stripe = useStripe();
  const elements = useElements();
  const { username } = useParams()

  useEffect(() => {
    async function getUserInfo() {
        const result = await API.get(username)
        setUser(result)
    }
    getUserInfo()
}, [username])


  const handleSubmit = async (event) => {
    try {
      if (!stripe || !elements) {
        return;
      } 
    } catch(e) {
      console.log(e)
    }

    const res = await axios.post('http://localhost:3001/payment', {email: email, amount:amount});
    const clientSecret = res.data['client_secret'];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
    //   Show error to your customer (e.g., insufficient funds)
      alert(result.error.message);
    }
    // The payment has been processed!
    else if (result.paymentIntent.status === 'succeeded') {
       history.push({
           pathname: '/payment/success',
           state: {detail: {user, email, firstName, lastName, amount}}
       })
    } else {
        console.log(result)
    }
};

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
      <div>
        <TextField className={classes.firstName}
            label='First name'
            id='outlined-firstName-input'
            helperText={`First name`}
            margin='normal'
            variant='outlined'
            type='text'
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField className={classes.lastName}
            label='Last name'
            id='outlined-lastName-input'
            helperText={`Last name`}
            margin='normal'
            variant='outlined'
            type='text'
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label='Email'
          id='outlined-email-input'
          helperText={`Email you'll recive updates and receipts on`}
          margin='small'
          variant='outlined'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
          <TextField
          label='Amount'
          id='outlined-amount-input'
          helperText={`Please enter an amount larger than $1`}
          margin='small'
          variant='outlined'
          type='string'
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
        </div>
        <CardInput />
        <div className={classes.div}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
                Donate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Payment;