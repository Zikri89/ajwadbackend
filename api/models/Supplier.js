module.exports = {
  tableName: 'suppliers',
  attributes: {
    name: { type: 'string', required: true },
    address: {
      type: 'string',
      required: true,
    },
    phone: {
      type: 'string',
      unique: true,
    },
    email: {
      type: 'string',
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
      via: 'supplier',
    },
  },

  beforeCreate: function (valuesToSet, proceed) {
    valuesToSet.createdBy = 'guest'
    proceed()
  },

  beforeUpdate: function (valuesToSet, proceed) {
    valuesToSet.updatedBy = 'guest'
    proceed()
  },
}
