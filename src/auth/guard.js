const AUTH_ENABLED = String(process.env.AUTH_ENABLED || "false") === "true";

function hasScope(userScopes, needed) {
  if (!Array.isArray(userScopes)) return false;
  if (userScopes.includes(needed)) return true;
  const [act, res] = String(needed).split(":");
  return userScopes.includes(`${act}:*`) || userScopes.includes(`*:${res}`) || userScopes.includes("*:*");
}

function requireScope(scopeBuilder) {
  return (req, res, next) => {
    if (!AUTH_ENABLED) return next();
    if (!req.user) {
      return res.status(401).json({ error: "unauthorized", message: "Missing or invalid token" });
    }
    const needed = scopeBuilder(req);
    const scopes = req.user.scopes || [];
    if (!hasScope(scopes, needed)) {
      return res.status(403).json({ error: "forbidden", message: `Missing scope: ${needed}` });
    }
    next();
  };
}

module.exports = { requireScope };