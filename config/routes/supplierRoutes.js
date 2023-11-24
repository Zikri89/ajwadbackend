module.exports.routes = {
  'GET /api/v1/supplier/:id': {
    controller: 'SupplierController',
    action: 'findById',
    middleware: 'checkApiKey',
  },
  'GET /api/v1/suppliers': {
    controller: 'SupplierController',
    action: 'find',
    middleware: 'checkApiKey',
  },
  'POST /api/v1/supplier': {
    controller: 'SupplierController',
    action: 'store',
    middleware: 'checkApiKey',
  },
  'PUT /api/v1/supplier/:id': {
    controller: 'SupplierController',
    action: 'update',
    middleware: 'checkApiKey',
  },
  'PATCH /api/v1/supplier/:id': {
    controller: 'SupplierController',
    action: 'softDelete',
    middleware: 'checkApiKey',
  },
  'DELETE /api/v1/supplier': {
    controller: 'SupplierController',
    action: 'destroy',
    middleware: 'checkApiKey',
  },
}
