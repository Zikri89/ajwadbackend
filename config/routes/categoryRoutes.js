module.exports.routes = {
  'GET /api/v1/category/:id': {
    controller: 'CategoryController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/categories': {
    controller: 'CategoryController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/category': {
    controller: 'CategoryController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/category/:id': {
    controller: 'CategoryController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/category/:id': {
    controller: 'CategoryController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/category': {
    controller: 'CategoryController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },
}
