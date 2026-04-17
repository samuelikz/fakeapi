const jwt = require("jsonwebtoken");

const SECRET = process.env.AUTH_JWT_SECRET || "dev-secret";
const TTL = process.env.AUTH_TOKEN_TTL || "1h";

/**
 * Remove claims reservadas (exp, iat, nbf) para evitar conflito com expiresIn.
 */
function sanitizePayload(payload) {
  const p = { ...(payload || {}) };
  delete p.exp;
  delete p.iat;
  delete p.nbf;
  return p;
}

function signToken(payload, options = {}) {
  const clean = sanitizePayload(payload);
  // mantém TTL padrão, mas permite sobrescrever via options
  const signOpts = { expiresIn: TTL, ...options };
  return jwt.sign(clean, SECRET, signOpts);
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = {
  signToken,
  verifyToken,
};
