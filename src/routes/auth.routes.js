const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { signToken, verifyToken } = require("../auth/jwt");
const { findUserByEmail } = require("../auth/user-store-file");

const router = Router();

/** POST /auth/login  body: { email, password } */
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "invalid_request", message: "email and password are required" });
  }

  const u = findUserByEmail(email);

  // Comparação constante mesmo quando usuário não existe (evita timing attacks)
  const hash = u ? u.password : "$2b$10$invalidhashforcomparisonpurposes000000000000000000000";
  const valid = await bcrypt.compare(String(password), hash);

  if (!u || !valid) {
    return res.status(401).json({ error: "unauthorized", message: "Invalid credentials" });
  }

  const payload = {
    sub: String(u.id),
    name: u.name || u.email,
    role: u.role || "user",
    scopes: Array.isArray(u.scopes) ? u.scopes : ["read:*"]
  };

  const token = signToken(payload);
  res.json({ token, user: payload });
});

/** Helper: extrai token apenas de body ou header Authorization */
function readIncomingToken(req) {
  const fromBody = req.body && (req.body.token || req.body.refreshToken || req.body.access_token);
  if (fromBody) return String(fromBody);

  const auth = req.headers && req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7);

  return "";
}

/** POST /auth/refresh — verifica a assinatura do token antes de renovar */
router.post("/refresh", (req, res) => {
  const oldToken = readIncomingToken(req);
  if (!oldToken) {
    return res.status(400).json({
      error: "token_required",
      message: "Provide token in body.token or Authorization: Bearer header"
    });
  }

  let oldPayload;
  try {
    oldPayload = verifyToken(oldToken);
  } catch {
    return res.status(401).json({ error: "invalid_token", message: "Token inválido ou expirado" });
  }

  const newToken = signToken(oldPayload);
  return res.json({
    token: newToken,
    user: {
      sub: String(oldPayload.sub),
      name: oldPayload.name,
      role: oldPayload.role,
      scopes: Array.isArray(oldPayload.scopes) ? oldPayload.scopes : []
    }
  });
});

module.exports = { authRouter: router };
