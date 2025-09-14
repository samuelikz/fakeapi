const fs = require("node:fs");
const path = require("node:path");

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), "db.json");

function findUserByEmail(email) {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  const db = JSON.parse(raw);
  const users = db.users || [];
  return users.find(u => String(u.email || "").toLowerCase() === String(email).toLowerCase());
}

module.exports = { findUserByEmail };