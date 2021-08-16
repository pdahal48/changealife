const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

function createToken(user) {
  let payload = {
    username: user.username,
    isAdmin: user.is_admin || false,
    isCreator: user.is_creator || false
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };