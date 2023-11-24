module.exports = {
  tableName: 'products',
  attributes: {
    name: { type: 'string', required: true },
    productCode: {
      type: 'string',
      required: true,
      unique: true,
    },
    slug: {
      type: 'string',
      required: true,
      unique: true,
    },
    supplier: {
      model: 'supplier',
      required: true,
    },
    category: {
      model: 'category',
      required: true,
    },
    exd: {
      type: 'string',
    },
    stars: {
      type: 'number',
      defaultsTo: 0,
    },
    price: {
      type: 'number',
      required: true,
    },
    weight: {
      type: 'number',
      required: true,
    },
    coupon: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    stock: {
      type: 'number',
      required: true,
    },
    video: {
      type: 'string',
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
