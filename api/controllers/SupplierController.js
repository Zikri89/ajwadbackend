module.exports = {
  find: async function (req, res) {
    try {
      const supplier = await Supplier.find().populate('products')

      if (!supplier) {
        return res.notFound('supplier not found')
      }

      return res.json(supplier)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const supplierId = req.param('id')
      const supplier = await Supplier.findOne({ id: supplierId }).populate(
        'products'
      )

      if (!supplier) {
        return res.notFound('supplier not found')
      }

      return res.json(supplier)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const supplier = await Supplier.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!supplier) {
        return res.notFound('supplier not created')
      }

      return res.json({
        message: 'supplier created successfully',
        result: supplier,
      })
    } catch (err) {
      if (err.code === 'E_UNIQUE') {
        return res.status(400).json({ error: 'Unique constraint violated.' })
      } else if (err.code === 'E_REQUIRED') {
        return res.status(400).json({ error: 'Required field missing.' })
      } else {
        // Handle other errors
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  },

  update: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const supplierId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const supplier = await Supplier.update(
        { id: supplierId },
        updatedData
      ).fetch()

      if (!supplier || supplier.length === 0) {
        return res.notFound('Supplier not found')
      }

      return res.json({
        message: 'Supplier updated successfully',
        result: supplier[0],
      })
    } catch (err) {
      if (err.code === 'E_UNIQUE') {
        return res.status(400).json({ error: 'Unique constraint violated.' })
      } else if (err.code === 'E_REQUIRED') {
        return res.status(400).json({ error: 'Required field missing.' })
      } else {
        // Handle other errors
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  },

  softDelete: async function (req, res) {
    try {
      const supplierId = req.params.id
      if (!supplierId) {
        return res.badRequest('Supplier ID is required')
      }

      const supplier = await Supplier.updateOne({ id: supplierId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
        })
        .fetch()

      if (!supplier || supplier.length === 0) {
        return res.notFound('Supplier not found')
      }

      return res.json({
        message: 'Supplier deleted successfully',
        result: supplier[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const supplier = await Supplier.destroy({}).fetch()

      if (!supplier || supplier.length === 0) {
        return res.notFound('Supplier not found')
      }

      return res.json({
        message: 'Supplier deleted successfully',
        result: supplier[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
