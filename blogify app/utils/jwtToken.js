const jwt = require("jsonwebtoken");

const secret_key = "secret_key";

async function genToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role:user.role
  };
  return jwt.sign(payload, secret_key);
}

async function verifyToken(token) {
  return jwt.verify(token, secret_key);
}

module.exports = {
  genToken,
  verifyToken,
};
