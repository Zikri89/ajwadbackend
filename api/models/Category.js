module.exports = {
  tableName: 'categories',
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
      unique: true,
    },
    ordering: {
      type: 'number',
      required: true,
      unique: true,
    },
    description: {
      type: 'string',
    },
    isActive: {
      type: 'boolean',
      defaultsTo: false,
    },
    createdBy: {
      type: 'string',
    },
    updatedBy: {
      type: 'string',
    },
    deletedBy: {
      type: 'string',
    },
    deletedAt: {
      type: 'string',
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
    products: {
      collection: 'product',
      via: 'category',
    },
  },
}
