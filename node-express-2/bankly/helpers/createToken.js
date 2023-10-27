const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");


/** return signed JWT for payload {username, admin}. */

function createToken(user) {
  let payload = {username:user.username, admin: user.admin || false};
  console.log(user)
  return jwt.sign(payload, SECRET_KEY);
}


module.exports = createToken;