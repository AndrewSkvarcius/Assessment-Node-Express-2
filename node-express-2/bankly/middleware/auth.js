/** Middleware for handling req authorization for routes. */

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

/** Authorization Middleware: Requires user is logged in. */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}
/** Authorization Middleware: Requires user is logged in and is staff. */

function ensureAdmin(req, res, next) {
  try {
    if (!res.locals.user || !res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Authentication Middleware: put user on request
 *
 * If there is a token, verify it, get payload (username/admin),
 * and store the username/admin on the request, so other middleware/routes
 * can use it.
 *
 * It's fine if there's no token---if not, don't set anything on the
 * request.
 *
 * If the token is invalid, an error will be raised.
 *
 **/

function authUser(req, res, next) {
  try {
    const tokenFromBody = req.body._token;
    const tokenFromQuery = req.query._token;
    const token = tokenFromBody || tokenFromQuery;
   
    if (token) {
      let payload = jwt.decode(token);

      console.log('Decoded JWT Payload:', payload); // Log the payload
      

        req.curr_username = payload.username;
        req.curr_admin = payload.admin;
        console.log("in auth", req.curr_username)
      

    }
    return next();
  } catch (err) {
    err.status = 401;
    return next(err);
  }
} // end
function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}
module.exports = {
 
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin
};
