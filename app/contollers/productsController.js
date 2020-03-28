const Product = require('../models/product')

module.exports.list = (req, res) => {
    // Product.find() 
    //     .then(product => res.send(product))
    //     .catch(err => res.send(err))
    res.send('working')
}

module.exports.create = (req, res) => {
    const body = req.body
    const product = new Product(body)
    product.save()
        .then(product => res.send(product))
        .catch(err => res.send(err))
}