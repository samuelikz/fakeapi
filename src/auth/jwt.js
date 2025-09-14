const jwt = require("jsonwebtoken");

const SECRET = process.env.AUTH_JWT_SECRET || "dev-secret";
const TTL = process.env.AUTH_TOKEN_TTL || "1h";

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: TTL });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { signToken, verifyToken };