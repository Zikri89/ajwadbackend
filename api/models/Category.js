module.exports = {
  tableName: 'categories',
  attributes: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    products: {
      collection: 'product',
      via: 'category',
    },
  },
}
