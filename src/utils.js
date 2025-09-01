const fs = require('fs');
const path = require('path');

function safeReadJSON(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, 'utf-8') || '{}';
  try { return JSON.parse(raw); } catch { return {}; }
}

function safeWriteJSON(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function nextId(array) {
  if (!Array.isArray(array) || array.length === 0) return 1;
  return Math.max(...array.map(i => Number(i.id) || 0)) + 1;
}

module.exports = { safeReadJSON, safeWriteJSON, nextId };
