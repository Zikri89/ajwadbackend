module.exports = {
  find: async function (req, res) {
    try {
      const category = await Category.find()

      if (!category) {
        return res.notFound('category not found')
      }

      return res.json(category)
    } catch (error) {
      return res.serverError(error)
    }
  },

  findById: async function (req, res) {
    try {
      const categoryId = req.param('id')
      const category = await Category.findOne({ id: categoryId })

      if (!category) {
        return res.notFound('category not found')
      }

      return res.json(category)
    } catch (error) {
      return res.serverError(error)
    }
  },

  store: async function (req, res) {
    try {
      const keys = Object.keys(req.body)
      const category = await Category.create(
        keys.reduce((acc, key) => {
          acc[key] = req.body[key]
          return acc
        }, {})
      ).fetch()

      if (!category) {
        return res.notFound('category not created')
      }

      return res.json({
        message: 'category created successfully',
        result: category,
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
      const categoryId = req.param('id')
      const updatedData = keys.reduce((acc, key) => {
        acc[key] = req.body[key]
        return acc
      }, {})

      const category = await Category.update(
        { id: categoryId },
        updatedData
      ).fetch()

      if (!category || category.length === 0) {
        return res.notFound('category not found')
      }

      return res.json({
        message: 'category updated successfully',
        result: category[0],
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
      const categoryId = req.params.id
      if (!categoryId) {
        return res.badRequest('category ID is required')
      }

      const category = await Category.updateOne({ id: categoryId })
        .set({
          deletedBy: 'guest',
          deletedAt: new Date(),
          isDeleted: true,
        })
        .fetch()

      if (!category || category.length === 0) {
        return res.notFound('category not found')
      }

      return res.json({
        message: 'category deleted successfully',
        result: category[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },

  destroy: async function (req, res) {
    try {
      const category = await Category.destroy({}).fetch()

      if (!category || category.length === 0) {
        return res.notFound('category not found')
      }

      return res.json({
        message: 'category deleted successfully',
        result: category[0],
      })
    } catch (error) {
      return res.serverError(error)
    }
  },
}
