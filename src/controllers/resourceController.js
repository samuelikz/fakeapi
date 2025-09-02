const databaseService = require('../services/databaseService');

class ResourceController {
  // Listar recursos com paginação e filtros
  list(req, res) {
    const { items, total, page, limit } = databaseService.list(req.params.resource, req.query);
    
    res.set('X-Total-Count', String(total));
    const wantMeta = String(req.query._meta || '0') === '1';
    
    if (!wantMeta) {
      return res.json(items);
    }
    
    const pages = Math.ceil(total / (limit || 1));
    res.json({ 
      data: items, 
      meta: { page, limit, total, pages } 
    });
  }

  // Obter um recurso específico
  get(req, res) {
    const item = databaseService.get(req.params.resource, req.params.id);
    if (!item) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: `${req.params.resource} with id ${req.params.id} not found` 
      });
    }
    res.json(item);
  }

  // Criar novo recurso
  create(req, res) {
    const created = databaseService.create(req.params.resource, req.body || {});
    res.status(201).json(created);
  }

  // Atualizar recurso (substituição completa)
  update(req, res) {
    const updated = databaseService.update(req.params.resource, req.params.id, req.body || {}, false);
    if (!updated) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: `${req.params.resource} with id ${req.params.id} not found` 
      });
    }
    res.json(updated);
  }

  // Atualizar recurso (merge parcial)
  patch(req, res) {
    const updated = databaseService.update(req.params.resource, req.params.id, req.body || {}, true);
    if (!updated) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: `${req.params.resource} with id ${req.params.id} not found` 
      });
    }
    res.json(updated);
  }

  // Remover recurso
  remove(req, res) {
    const removed = databaseService.remove(req.params.resource, req.params.id);
    if (!removed) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: `${req.params.resource} with id ${req.params.id} not found` 
      });
    }
    res.status(204).send();
  }
}

module.exports = new ResourceController();
