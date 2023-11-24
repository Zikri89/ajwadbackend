module.exports = {
  find: async function (req, res) {
    try {
      const product = await Product.find()
        .populate('category')
        .populate('supplier')

      if (!product) {
        return res.notFound('Product not found')
      }

      return res.json(product)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const productId = req.param('id')
      const product = await Product.findOne({ id: productId })
        .populate('category')
        .populate('supplier')

      if (!product) {
        return res.notFound('Product not found')
      }

      return res.json(product)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const product = await Product.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!product) {
        return res.notFound('Product not created')
      }

      return res.json({
        message: 'Product created successfully',
        result: product,
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
      const productId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const product = await Product.update(
        { id: productId },
        updatedData
      ).fetch()

      if (!product || product.length === 0) {
        return res.notFound('Product not found')
      }

      return res.json({
        message: 'Product updated successfully',
        result: product[0],
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
      const productId = req.params.id
      if (!productId) {
        return res.badRequest('Product ID is required')
      }

      const product = await Product.updateOne({ id: productId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
        })
        .fetch()

      if (!product || product.length === 0) {
        return res.notFound('Product not found')
      }

      return res.json({
        message: 'Product deleted successfully',
        result: product[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const product = await Product.destroy({}).fetch()

      if (!product || product.length === 0) {
        return res.notFound('Product not found')
      }

      return res.json({
        message: 'Product deleted successfully',
        result: product[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
