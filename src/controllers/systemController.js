const databaseService = require('../services/databaseService');

class SystemController {
  // Listar recursos disponíveis com contagem
  getResources(req, res) {
    const resources = databaseService.counts();
    res.json(resources);
  }

  // Documentação da API
  getDocs(req, res) {
    res.type('text').send(`
FAKE API - Documentação

ENDPOINTS DISPONÍVEIS:
======================

GET /__resources                    -> Lista recursos disponíveis com contagem
GET /_docs                         -> Esta documentação
GET /:resource                     -> Lista itens de um recurso
GET /:resource/:id                 -> Obtém item específico
POST /:resource                    -> Cria novo item
PUT /:resource/:id                 -> Atualiza item (substituição completa)
PATCH /:resource/:id               -> Atualiza item (merge parcial)
DELETE /:resource/:id              -> Remove item
POST /_ensure/:resource            -> Cria recurso se não existir

PARÂMETROS DE CONSULTA:
=======================

q       -> Busca textual em todos os campos
_page   -> Número da página (padrão: 1)
_limit  -> Itens por página (padrão: 50, máximo: 100)
_meta   -> Incluir metadados de paginação (0 ou 1)

EXEMPLOS:
=========

GET /posts                    -> Lista todos os posts
GET /posts?q=javascript      -> Busca posts com "javascript"
GET /posts?_page=2&_limit=10 -> Posts da página 2, 10 por página
GET /posts?_meta=1           -> Posts com metadados de paginação
GET /posts/1                 -> Post com ID 1
POST /posts                  -> Cria novo post
PUT /posts/1                 -> Atualiza post 1 completamente
PATCH /posts/1               -> Atualiza post 1 parcialmente
DELETE /posts/1              -> Remove post 1

PÁGINA INICIAL:
===============
Acesse / para a interface web
    `);
  }

  // Criar recurso se não existir
  ensureResource(req, res) {
    const resource = req.params.resource;
    const created = databaseService.create(resource, req.body || {});
    res.status(201).json(created);
  }

  // Reset do banco de dados
  resetDatabase(req, res) {
    const resetDB = databaseService.reset();
    res.json({ 
      message: 'Database reset successfully', 
      collections: Object.keys(resetDB) 
    });
  }
}

module.exports = new SystemController();
