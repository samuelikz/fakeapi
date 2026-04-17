/**
 * Middleware de validação básica
 * Valida se o corpo da requisição é um JSON válido
 */
function validateJSON(req, res, next) {
  if (req.method === 'GET' || req.method === 'DELETE') {
    return next();
  }
  
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Request body is required for this operation'
    });
  }
  
  next();
}

/**
 * Middleware de validação de ID
 * Valida se o ID fornecido é válido
 */
function validateId(req, res, next) {
  const id = req.params.id;

  // Regular expression to match IDs like 'p001', 'p123', etc.
  // It checks for 'p' followed by one or more digits.
  const alphanumericPattern = /^p\d+$/;

  if (!id || (!(alphanumericPattern.test(id) || (!isNaN(Number(id)) && Number(id) > 0)))) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid ID parameter. ID must be a positive number or start with "p" followed by numbers (e.g., p001).'
    });
  }

  next();
}

/**
 * Middleware de validação de paginação
 * Valida e normaliza parâmetros de paginação
 */
function validatePagination(req, res, next) {
  const page = parseInt(req.query._page || '1', 10);
  const limit = parseInt(req.query._limit || '50', 10);
  
  if (page < 1 || limit < 1 || limit > 100) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid pagination parameters. Page must be >= 1, limit must be between 1 and 100.'
    });
  }
  
  // Normalizar parâmetros
  req.query._page = page;
  req.query._limit = limit;
  
  next();
}

module.exports = {
  validateJSON,
  validateId,
  validatePagination
};
