const Product = require('../models/product')

module.exports.list = (req, res) => {
    Product
        .find()
        .limit(10) 
            .then(product => {
                // console.log(product)
                res.send(product)
            })
            .catch(err => res.send(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    const product = new Product(body)
    product.save()
        .then(product => res.send(product))
        .catch(err => res.send(err))
}

module.exports.query = (req, res) => {
    const body = req.body
    const operand1 = body.filters[0].operand1
    let operand2 = body.filters[0].operand2
    const operator = body.filters[0].operator
    if(body.query_type == 'discounted_products_list') {
        // if(operand1 && operator && operand2){ // checking if coming filter is truthy value or not // coz server side authentication is necessary.}
        if(operand1 == 'brand.name' && operand2) { // checking operands are valid or not
            if(operator == '==') { // checking for the operator is '==' or not for 'brand.name'
                Product
                .find({'brand.name': operand2})
                .limit(10)
                    .then(product => {
                        if(product.length > 0){
                            res.send(product)
                        } else {
                            res.send([])
                        }
                    })
                    .catch(err => res.send(err))
            } else{
                res.send('operator not valid')
            }
        } else if(operand1 == "discount") {
            operand2 = Number(operand2) // checking if the operand 2 is a valid number
            if(operand2 || operand2 == '0'){
                if(operator == '=='){
                    Product.aggregate([
                        { $project: {'price.regular_price.value': 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                        { $project: {discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                        { $project: {discount: {$multiply: ["$discount", 100]}} },
                        { $match: {discount: { $eq: operand2}} },
                        { $limit: 10 }
                      ]).
                        then(products => res.send(products))
                        .catch(err => res.send(err))
                } else if(operator == '>'){
                    Product.aggregate([
                        { $project: {'price.regular_price.value': 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                        { $project: {discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                        { $project: {discount: {$multiply: ["$discount", 100]}} },
                        { $match: {discount: { $gt: operand2}} },
                        { $limit: 10 }
                      ]).
                        then(products => res.send(products))
                        .catch(err => res.send(err))
                } else if(operator == '<'){
                    Product.aggregate([
                        { $project: {'price.regular_price.value': 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                        { $project: {discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                        { $project: {discount: {$multiply: ["$discount", 100]}} },
                        { $match: {discount: { $lt: operand2}} },
                        { $limit: 10 }
                      ]).
                        then(products => res.send(products))
                        .catch(err => res.send(err))
                } else {
                    res.send('operator is not valid')
                }
            } else {
                res.send('operand 2 is not a number')
            }
        } else{
            res.send('operands are not valid')
        }
    } else if(body.query_type == 'discounted_products_count|avg_discount') {
        if(operand1 == 'brand.name' && operand2) { 
            if(operator == '==') { 
                Product.aggregate([
                    { $match: {'brand.name': operand2 } },
                    { $project: {'price.regular_price.value': 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                    { $project: {discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                    { $project: {discount: {$multiply: ["$discount", 100]}} },
                    // { $group: { _id: null, myCount: { $sum: 1 } } },
                    // { $project: { _id: 0 } }
                    // { $group: { _id: null, total: {$sum: "$discount"}} },
                    { $group: { _id: null, total: {$sum: "$discount"}, discounted_products_count: { $sum: 1 }} },
                    { $project: { discounted_products_count: 1, avg_discount: {$divide: ["$total", "$discounted_products_count"]}} },
                    // { $project: {discount: 1, total: 1, count: {$sum: ["$discount"]}} },
                    // { $match: {discount: { $eq: operand2}} },
                    { $limit: 500 }
                  ]).
                    then(products => res.send(products))
                    .catch(err => res.send(err))
            } else{
                res.send('operator not valid')
            }
        } else{
            res.send('operands are not valid')
        }
    }else {
        res.send('invalid request')
    }
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