const { verifyToken } = require("./jwt");

const AUTH_ENABLED = String(process.env.AUTH_ENABLED || "false") === "true";

function authOptional(req, _res, next) {
  if (!AUTH_ENABLED) return next();

  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.slice(7);
    try {
      req.user = verifyToken(token);
    } catch {
      // token inválido: segue sem req.user
    }
  }
  next();
}

module.exports = { authOptional };