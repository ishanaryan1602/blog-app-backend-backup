const { genToken, verifyToken } = require("../utils/jwtToken");

function checkCookie(cookieName) {
  return async (req, res, next) => {
    const userCookie = req.cookies[cookieName];
    if (!userCookie) {
      console.log("No user cookie found");
      req.user = null;
    } else {
      try {
        const returnedUserPayload = await verifyToken(userCookie);
        req.user = returnedUserPayload;
        console.log("User payload in middleware:", req.user); // Debug log
      } catch (error) {
        console.error("Error verifying token:", error); // Debug log
        req.user = null;
      }
    }
    return next();
  };
}

module.exports = checkCookie;
