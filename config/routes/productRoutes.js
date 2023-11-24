module.exports.routes = {
  'GET /api/v1/product/:id': {
    controller: 'ProductController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/products': {
    controller: 'ProductController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/product': {
    controller: 'ProductController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/product/:id': {
    controller: 'ProductController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/product/:id': {
    controller: 'ProductController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/product': {
    controller: 'ProductController',
    action: 'destroy',
    middleware: 'checkApiKey',
  }
}
