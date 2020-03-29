const Product = require('../models/product')

module.exports.list = (req, res) => {
    Product.find() 
        .then(product => res.send(product))
        .catch(err => res.send(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    const product = new Product(body)
    product.save()
        .then(product => res.send(product))
        .catch(err => res.send(err))
}

module.exports.show = (req, res) => {
    const _id = req.params.id
    Product.findOne({_id})
        .then(product => {
            if(product) {
                res.send(product)
            } else {
                res.send({})
            }
        })
        .catch(err => res.send(err))
}