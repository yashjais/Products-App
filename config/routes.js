const express = require('express')
const router = express.Router()
const productController = require('../app/contollers/productsController')


router.get('/products', productController.list)

router.post('/products', productController.create)

module.exports = router