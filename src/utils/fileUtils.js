const fs = require('fs');
const path = require('path');

/**
 * Lê um arquivo JSON de forma segura
 * @param {string} filePath - Caminho do arquivo
 * @returns {object} - Objeto JSON ou objeto vazio se erro
 */
function safeReadJSON(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, 'utf-8') || '{}';
  try { 
    return JSON.parse(raw); 
  } catch (error) { 
    console.error(`Error reading JSON file: ${filePath}`, error);
    return {}; 
  }
}

/**
 * Escreve um arquivo JSON de forma segura
 * @param {string} filePath - Caminho do arquivo
 * @param {any} data - Dados para escrever
 */
function safeWriteJSON(filePath, data) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing JSON file: ${filePath}`, error);
    throw error;
  }
}

/**
 * Gera o próximo ID para uma coleção
 * @param {Array} array - Array de itens
 * @returns {number} - Próximo ID disponível
 */
function nextId(array) {
  if (!Array.isArray(array) || array.length === 0) return 1;
  return Math.max(...array.map(i => Number(i.id) || 0)) + 1;
}

module.exports = { safeReadJSON, safeWriteJSON, nextId };
