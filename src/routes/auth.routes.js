const { Router } = require("express");
const { signToken } = require("../auth/jwt");
const { findUserByEmail } = require("../auth/user-store-file");

const router = Router();

/** POST /auth/login  body: { email, password } */
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "invalid_request", message: "email and password are required" });
  }

  const u = findUserByEmail(email);
  if (!u || u.password !== password) {
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

/** POST /auth/refresh  body: { token }  (mock simples) */
router.post("/refresh", (req, res) => {
  const { token: oldToken } = req.body || {};
  if (!oldToken) return res.status(400).json({ error: "token_required" });
  try {
    const parts = String(oldToken).split(".");
    if (parts.length !== 3) throw new Error("bad token format");
    const payloadBase64 = parts[1];
    const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString());
    const newToken = signToken(payload);
    res.json({ token: newToken, user: payload });
  } catch {
    res.status(400).json({ error: "invalid_token" });
  }
});

module.exports = { authRouter: router };