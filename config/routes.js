const express = require('express')
const router = express.Router()
const productController = require('../app/contollers/productsController')


router.get('/products', productController.list)
router.post('/products', productController.create)
router.post('/products/query', productController.query)
router.get('/products/:id', productController.show)

module.exports = router