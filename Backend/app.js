const express  = require('express')
const userRoutes = require('./Routes/users')
const shelterRoutes = require('./Routes/shelters')
const wishListRoutes = require('./Routes/wishlist')
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require('./Middleware/auth')
const paymentRoutes = require('./Routes/payment')
const cors = require("cors");


const app = express()
app.use(express.json())
app.use(authenticateJWT)
app.use(cors());

app.use('/users', userRoutes)
app.use('/shelters', shelterRoutes)
app.use('/payment', paymentRoutes)
app.use('/wishes', wishListRoutes)

app.use(function (req, res, next) {
    return next(new NotFoundError());
  });
  
  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });

module.exports = app;