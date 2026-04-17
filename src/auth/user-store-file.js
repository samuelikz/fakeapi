const DB_CONFIG = require("../config/database");
const { safeReadJSON } = require("../utils/fileUtils");

function findUserByEmail(email) {
  const db = safeReadJSON(DB_CONFIG.path);
  const users = db.users || [];
  return users.find(u => String(u.email || "").toLowerCase() === String(email).toLowerCase());
}

module.exports = { findUserByEmail };