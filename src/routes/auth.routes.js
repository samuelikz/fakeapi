const { Router } = require("express");
<<<<<<< HEAD
const bcrypt = require("bcryptjs");
const { signToken, verifyToken } = require("../auth/jwt");
=======
const { signToken } = require("../auth/jwt");
>>>>>>> 3214833aa1adf06f8d18c37b49f1d4571f951a4b
const { findUserByEmail } = require("../auth/user-store-file");

const router = Router();

/** POST /auth/login  body: { email, password } */
<<<<<<< HEAD
router.post("/login", async (req, res) => {
=======
router.post("/login", (req, res) => {
>>>>>>> 3214833aa1adf06f8d18c37b49f1d4571f951a4b
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "invalid_request", message: "email and password are required" });
  }

  const u = findUserByEmail(email);
<<<<<<< HEAD

  // Comparação constante mesmo quando usuário não existe (evita timing attacks)
  const hash = u ? u.password : "$2b$10$invalidhashforcomparisonpurposes000000000000000000000";
  const valid = await bcrypt.compare(String(password), hash);

  if (!u || !valid) {
=======
  if (!u || u.password !== password) {
>>>>>>> 3214833aa1adf06f8d18c37b49f1d4571f951a4b
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

<<<<<<< HEAD
/** Helper: extrai token apenas de body ou header Authorization */
=======
/** Helper: extrai token de body, header ou query */
>>>>>>> 3214833aa1adf06f8d18c37b49f1d4571f951a4b
function readIncomingToken(req) {
  const fromBody = req.body && (req.body.token || req.body.refreshToken || req.body.access_token);
  if (fromBody) return String(fromBody);

  const auth = req.headers && req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7);

<<<<<<< HEAD
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
=======
  if (req.query && (req.query.token || req.query.refreshToken || req.query.access_token)) {
    return String(req.query.token || req.query.refreshToken || req.query.access_token);
  }

  return "";
}

/** POST /auth/refresh  (mock simples) */
router.post("/refresh", (req, res) => {
  try {
    const oldToken = readIncomingToken(req); // sua função helper (como no patch anterior)
    if (!oldToken) {
      return res.status(400).json({ error: "token_required", message: "Provide token in body.token, Authorization: Bearer, or ?token=" });
    }

    const parts = String(oldToken).split(".");
    if (parts.length !== 3) {
      return res.status(400).json({ error: "invalid_token", message: "Malformed JWT (expected 3 parts)" });
    }

    const payloadBase64 = parts[1];
    const raw = Buffer.from(payloadBase64, "base64url").toString();
    const oldPayload = JSON.parse(raw);

    // aqui não precisa deletar manualmente exp/iat/nbf, pois signToken já sanitiza
    const newToken = signToken(oldPayload);

    return res.json({ token: newToken, user: {
>>>>>>> 3214833aa1adf06f8d18c37b49f1d4571f951a4b
      sub: String(oldPayload.sub),
      name: oldPayload.name,
      role: oldPayload.role,
      scopes: Array.isArray(oldPayload.scopes) ? oldPayload.scopes : []
<<<<<<< HEAD
    }
  });
=======
    }});
  } catch (e) {
    return res.status(400).json({ error: "invalid_token", message: e?.message || "Cannot parse/refresh token" });
  }
>>>>>>> 3214833aa1adf06f8d18c37b49f1d4571f951a4b
});

module.exports = { authRouter: router };
