"use strict";

const jsonschema = require("jsonschema");
const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const newUserschema = require("../schemas/newUserschema.json");


/** POST /auth/register:   { user } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

 router.post("/register", async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, newUserschema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        return res.json({erros: errs});
      }
      const newUser = await User.register({ ...req.body, isAdmin: false });
      const token = createToken(newUser);
      return res.status(201).json({ token });
    } catch (err) {
      return next(err);
    }
  });
  

  module.exports = router;
  