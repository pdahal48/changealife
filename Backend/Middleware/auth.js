"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
    try {
        let payload = jwt.verify(req.body._token, SECRET_KEY);
        req.user = payload
        return next();
    } catch (err) {
        return next();
    }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
*/

function ensureLoggedIn(req, res, next) {
  try {
    if (!req.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

function ensureAdmin(req, res, next) {
    try {
      if (!req.user || !req.user.isAdmin) {
        throw new UnauthorizedError();
      }
      return next();
    } catch (err) {
      return next(err);
    }
}

function ensureCreator(req, res, next) {
    try {
        if (!req.user || !req.user.isCreator) {
            throw new UnauthorizedError();
      }
      return next();
    } catch (err) {
      return next(err);
    }
}

function ensureCorrectUserOrCreator(req, res, next) {
    try {
      const user = req.user;
      if (!(user && (user.isCreator || user.username === req.params.username))) {
        throw new UnauthorizedError();
      }
      console.log(user)
      return next();
    } catch (err) {
      return next(err);
    }
  }

  function ensureAdminOrCreator(req, res, next) {
    try {
      if (!req.user || !req.user.isCreator || !req.user.isAdmin) {
        throw new UnauthorizedError();
      }
      return next();
    } catch (err) {
      return next(err);
    }
  }

  module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureCreator,
    ensureCorrectUserOrCreator,
    ensureAdminOrCreator
  };