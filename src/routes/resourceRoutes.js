const express = require('express');
const resourceController = require('../controllers/resourceController');
const { validateId } = require('../middleware/validation');

const router = express.Router();

// Middleware para capturar o nome do recurso
router.param('resource', (req, res, next, resource) => {
  req.params.resource = resource;
  next();
});

// Rotas CRUD para recursos dinâmicos
router.get('/:resource', resourceController.list);
router.get('/:resource/:id', validateId, resourceController.get);
router.post('/:resource', resourceController.create);
router.put('/:resource/:id', validateId, resourceController.update);
router.patch('/:resource/:id', validateId, resourceController.patch);
router.delete('/:resource/:id', validateId, resourceController.remove);

module.exports = router;
