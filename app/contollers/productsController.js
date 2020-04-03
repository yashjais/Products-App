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
    // console.log('in the backend')
    const body = req.body
    let operand1, operand2, operator
    if(body.filters) {
        operand1 = body.filters[0].operand1
        operand2 = body.filters[0].operand2
        operator = body.filters[0].operator
    }
    if(body.query_type == 'discounted_products_list') {
        // if(operand1 && operator && operand2){ // checking if coming filter is truthy value or not // coz server side authentication is necessary.}
        if(operand1 == 'brand.name' && operand2) { // checking operands are valid or not
            if(operator == '==') { // checking for the operator is '==' or not for 'brand.name'
            // console.log('inside')
                Product.aggregate([
                    { $match: {'brand.name': operand2 } },
                    { $project: {name: 1, price: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                    { $project: {name: 1, price: 1,  'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                    { $project: {name: 1, price: 1,  'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, discount: {$multiply: ["$discount", 100]}} },
                    { $limit: 10 }
                ])
                    .then(products => res.send(products))
                    .catch(err => res.send(err))
            } else{
                res.send({errors: 'operator not valid'})
            }
        } else if(operand1 == 'discount') {
            operand2 = Number(operand2) // checking if the operand 2 is a valid number
            // console.log(operand2)
            if(operand2 || operand2 == '0'){
                if(operator == '=='){
                    Product.aggregate([
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                        { $project: {name: 1, price: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                        { $project: {name: 1, price: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, discount: {$multiply: ["$discount", 100]}} },
                        { $match: {discount: { $eq: operand2}} },
                        { $limit: 10 }
                      ]).
                        then(products => res.send(products))
                        .catch(err => res.send(err))
                } else if(operator == '>'){
                    Product.aggregate([
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                        { $project: {name: 1, price: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                        { $project: {name: 1, price: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, discount: {$multiply: ["$discount", 100]}} },
                        { $match: {discount: { $gt: operand2}} },
                        { $limit: 10 }
                      ]).
                        then(products => res.send(products))
                        .catch(err => res.send(err))
                } else if(operator == '<'){
                    Product.aggregate([
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                        { $project: {name: 1, price: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                        { $project: {name: 1, price: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, discount: {$multiply: ["$discount", 100]}} },
                        { $match: {discount: { $lt: operand2}} },
                        { $limit: 10 }
                      ]).
                        then(products => res.send(products))
                        .catch(err => res.send(err))
                } else {
                    res.send({errors: 'operator is not valid'})
                }
            } else {
                res.send({errors: 'operand 2 is not a number'})
            }
        } else{
            res.send({ errors: 'operands are not valid'})
        }
    } else if(body.query_type == 'discounted_products_count|avg_discount') {
        if(operand1 == 'brand.name' && operand2) { 
            if(operator == '==') { 
                Product.aggregate([
                    { $match: {'brand.name': operand2 } },
                    { $project: {'price.regular_price.value': 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                    { $project: {discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                    { $project: {discount: {$multiply: ["$discount", 100]}} },
                    { $group: { _id: null, total: {$sum: "$discount"}, discounted_products_count: { $sum: 1 }} },
                    { $project: { discounted_products_count: 1, avg_discount: {$divide: ["$total", "$discounted_products_count"]}} },
                  ])
                    .then(products => res.send(products))
                    .catch(err => res.send(err))
            } else{
                res.send({errors: 'operator not valid'})
            }
        } else if(operand1 == 'discount') {
            operand2 = Number(operand2)
            if(operand2 || operand2 == '0'){
                if(operator == '=='){
                    Product.aggregate([
                        { $project: {'price.regular_price.value': 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                        { $project: {discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                        { $project: {discount: {$multiply: ["$discount", 100]}} },
                        { $match: {discount: { $eq: operand2}} },
                        { $group: { _id: null, total: {$sum: "$discount"}, discounted_products_count: { $sum: 1 }} },
                        { $project: { discounted_products_count: 1, avg_discount: {$divide: ["$total", "$discounted_products_count"]}} },
                      ])
                        .then(products => res.send(products))
                        .catch(err => res.send(err))
                } else if(operator == '>'){
                    Product.aggregate([
                        { $project: {'price.regular_price.value': 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                        { $project: {discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                        { $project: {discount: {$multiply: ["$discount", 100]}} },
                        { $match: {discount: { $gt: operand2}} },
                        { $group: { _id: null, total: {$sum: "$discount"}, discounted_products_count: { $sum: 1 }} },
                        { $project: { discounted_products_count: 1, avg_discount: {$divide: ["$total", "$discounted_products_count"]}} },
                      ])
                        .then(products => res.send(products))
                        .catch(err => res.send(err))
                } else if(operator == '<'){
                    Product.aggregate([
                        { $project: {'price.regular_price.value': 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                        { $project: {discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                        { $project: {discount: {$multiply: ["$discount", 100]}} },
                        { $match: {discount: { $lt: operand2}} },
                        { $group: { _id: null, total: {$sum: "$discount"}, discounted_products_count: { $sum: 1 }} },
                        { $project: { discounted_products_count: 1, avg_discount: {$divide: ["$total", "$discounted_products_count"]}} },
                      ])
                        .then(products => res.send(products))
                        .catch(err => res.send(err))
                } else {
                    res.send({errors: 'operator is not valid'})
                }
            } else {
                res.send({ errors: 'operand 2 is not a number'})
            }
        } else{
            res.send({ errors: 'operands are not valid'})
        }
    } else if(body.query_type == 'expensive_list') {
        if(!body.filters){ // when filters are not given
            Product.aggregate([
                { $match: {$expr: {$gt: ["$price.basket_price.value" , "$similar_products.meta.avg_price.basket"]}} },
                { $limit: 10 }
            ])
                .then(products => res.send(products))
                .catch(err => res.send(err))
        } else {
            if(operand1 == 'brand.name' && operand2) { // checking operands are valid or not
                if(operator == '==') { // checking for the operator is '==' or not for 'brand.name'
                Product.aggregate([
                    { $match: {$expr: {$gt: ["$price.basket_price.value" , "$similar_products.meta.avg_price.basket"]}} },
                    { $match: {$expr: {$eq: ["$brand.name" , operand2]}} },
                    { $limit: 10 }
                ])
                    .then(products => res.send(products))
                    .catch(err => res.send(err))
                } else{
                    res.send({errors: 'operator not valid'})
                }
            } else if(operand1 == 'discount') {
                operand2 = Number(operand2) // checking if the operand 2 is a valid number
                if(operand2 || operand2 == '0'){
                    if(operator == '=='){
                        Product.aggregate([
                            { $match: {$expr: {$gt: ["$price.basket_price.value" , "$similar_products.meta.avg_price.basket"]}} },
                            { $project: {'name': 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                            { $project: {'name': 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                            { $project: {'name': 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount: {$multiply: ["$discount", 100]}} },
                            { $match: {discount: { $eq: operand2}} },
                            { $limit: 10 }
                        ]) 
                            .then(products => res.send(products))
                            .catch(err => res.send(err))
                    } else if(operator == '>'){
                        Product.aggregate([
                            { $match: {$expr: {$gt: ["$price.basket_price.value" , "$similar_products.meta.avg_price.basket"]}} },
                            { $project: {'name': 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                            { $project: {'name': 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                            { $project: {'name': 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount: {$multiply: ["$discount", 100]}} },
                            { $match: {discount: { $gt: operand2}} },
                            { $limit: 10 }
                        ]) 
                            .then(products => res.send(products))
                            .catch(err => res.send(err))
                    } else if(operator == '<'){
                        Product.aggregate([
                            { $match: {$expr: {$gt: ["$price.basket_price.value" , "$similar_products.meta.avg_price.basket"]}} },
                            { $project: {'name': 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}} },
                            { $project: {'name': 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount: {$divide: ["$difference", "$price.regular_price.value"]}} },
                            { $project: {'name': 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount: {$multiply: ["$discount", 100]}} },
                            { $match: {discount: { $lt: operand2}} },
                            { $limit: 10 }
                        ]) 
                            .then(products => res.send(products))
                            .catch(err => res.send(err))
                    } else {
                        res.send({errors: 'operator is not valid'})
                    }
                } else {
                    res.send({errors: 'operand 2 is not a number'})
                }
            } else{
                res.send({ errors: 'operands are not valid'})
            }
        }
    } else if(body.query_type == 'competition_discount_diff_list') {
        const operand3 = body.filters[1].operand1
        const operand4 = body.filters[1].operand2
        const operator1 = body.filters[1].operator
        if(operand1 == 'discount_diff' && operand3 == 'competition' && operator1 == '==') { // checking if the second object in the filters should always have a operand1 'competition' and operand2 as a website (and if website id is not valid, the answer will be an empty array)
            operand2 = Number(operand2)
            if(operand2 || operand2 == '0') {
                if(operator == '=='){
                    Product.aggregate([ 
                        { $match: {$expr: {$gt: [ `$similar_products.website_results.${operand4}.meta.avg_price.regular`, 0]}} }, // exclude the docs which have zero offer price(meta.avg_price.regular)
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1,'similar_products': 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}, difference1: {$subtract: [`$similar_products.website_results.${operand4}.meta.avg_price.regular`, `$similar_products.website_results.${operand4}.meta.avg_price.offer`]}} },
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount: {$divide: ["$difference", "$price.regular_price.value"]}, discount1: {$divide: ["$difference1", `$similar_products.website_results.${operand4}.meta.avg_price.regular`]}} },
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount_difference: { $subtract: ["$discount1", "$discount" ]}} } ,
                        { $project: {name: 1,'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount_difference: { $multiply: ["$discount_difference", 100]}} },
                        { $match: { $expr: {$eq: ["$discount_difference" , operand2]}} },
                        { $limit: 10 }
                    ])
                        .then(products => res.send(products))
                        .catch(err => res.send(err))
                } else if(operator == '>') {
                    Product.aggregate([ 
                        { $match: {$expr: {$gt: [ `$similar_products.website_results.${operand4}.meta.avg_price.regular`, 0]}} }, // exclude the docs which have zero offer price(meta.avg_price.regular)
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1,'similar_products': 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}, difference1: {$subtract: [`$similar_products.website_results.${operand4}.meta.avg_price.regular`, `$similar_products.website_results.${operand4}.meta.avg_price.offer`]}} },
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount: {$divide: ["$difference", "$price.regular_price.value"]}, discount1: {$divide: ["$difference1", `$similar_products.website_results.${operand4}.meta.avg_price.regular`]}} },
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount_difference: { $subtract: ["$discount1", "$discount" ]}} } ,
                        { $project: {name: 1,'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount_difference: { $multiply: ["$discount_difference", 100]}} },
                        { $match: { $expr: {$gt: ["$discount_difference" , operand2]}} },
                        { $limit: 10 }
                    ])
                        .then(products => res.send(products))
                        .catch(err => res.send(err))
                } else if(operator == '<') {
                    Product.aggregate([ 
                        { $match: {$expr: {$gt: [ `$similar_products.website_results.${operand4}.meta.avg_price.regular`, 0]}} }, // exclude the docs which have zero offer price(meta.avg_price.regular)
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1,'similar_products': 1, difference: {$subtract: ["$price.regular_price.value", "$price.offer_price.value"]}, difference1: {$subtract: [`$similar_products.website_results.${operand4}.meta.avg_price.regular`, `$similar_products.website_results.${operand4}.meta.avg_price.offer`]}} },
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount: {$divide: ["$difference", "$price.regular_price.value"]}, discount1: {$divide: ["$difference1", `$similar_products.website_results.${operand4}.meta.avg_price.regular`]}} },
                        { $project: {name: 1, 'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount_difference: { $subtract: ["$discount1", "$discount" ]}} } ,
                        { $project: {name: 1,'brand.name': 1, 'description_text': 1, 'media.thumbnail':1, price: 1, discount_difference: { $multiply: ["$discount_difference", 100]}} },
                        { $match: { $expr: {$lt: ["$discount_difference" , operand2]}} },
                        { $limit: 10 }
                    ])
                        .then(products => res.send(products))
                        .catch(err => res.send(err))
                } else {
                    res.send({errors: 'operator not valid'})
                }
            } else{
                res.send({errors: 'operand not valid'})
            }
        } else {
            res.send({errors: 'operand is not valid'})
        }
    } else {
        res.send({errors: 'invalid request'})
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