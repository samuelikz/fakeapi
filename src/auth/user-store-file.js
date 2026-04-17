<<<<<<< HEAD
const DB_CONFIG = require("../config/database");
const { safeReadJSON } = require("../utils/fileUtils");

function findUserByEmail(email) {
  const db = safeReadJSON(DB_CONFIG.path);
=======
const fs = require("node:fs");
const path = require("node:path");

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), "db.json");

function findUserByEmail(email) {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  const db = JSON.parse(raw);
>>>>>>> 3214833aa1adf06f8d18c37b49f1d4571f951a4b
  const users = db.users || [];
  return users.find(u => String(u.email || "").toLowerCase() === String(email).toLowerCase());
}

module.exports = { findUserByEmail };