const express = require('express');
const systemController = require('../controllers/systemController');

const router = express.Router();

// Endpoints do sistema
router.get('/__resources', systemController.getResources);
router.get('/_docs', systemController.getDocs);
router.post('/_ensure/:resource', systemController.ensureResource);
router.post('/_reset', systemController.resetDatabase);

module.exports = router;
