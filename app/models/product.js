const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    sku: {
        type: String
    },
    url: {
        type: String 
    },
    brand: {
        subbrand: {
            type: String
        }, 
        name: {
            type: String
        }
    },
    media: {
        standard: [{
            order: {
                type: String
            },
            url: {
                type: String
            }
        }],
        thumbnail: [{
            order: {
                type: String
            },
            url: {
                type: String
            }
        }]
    },
    website_id: {
        type: Schema.Types.ObjectId
    },
    price: {
        offer_price: {
            currency: String,
            value: Number
        },
        regular_price: {
            currency: String,
            value: Number
        },
        basket_price: {
            currency: String,
            value: Number
        }
    },
    sizes: [String],
    description_text: {
        type: String
    },  
    stock: {
        available: {
            type: Boolean
        }
    },
    spider: {
        type: String
    },
    meta: {
        bert_original_classification: {
            l1: String,
            l2: String,
            l3: String,
            l4: String,
        },
        breadcrumbs: {
            1: String,
            2: String,
            3: String,
        },
        reference: String
    },
    classification: {
        l1: String,
        l2: String,
        l3: String,
        l4: String,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date
    },
    similar_products: {
        meta: {
            min_price: {
                regular: Number,
                offer: Number,
                basket: Number,
            },
            max_price: {
                regular: Number,
                offer: Number,
                basket: Number,
            },
            avg_price: {
                regular: Number,
                offer: Number,
                basket: Number,
            },
            avg_discount: Number
        },
    },
    price_positioning: {
        type: Number,
        required: true
    },
    price_positioning_text: {
        type: String,
        required: true
    },
    lv_url: {
        type: String,
    },
    positioning: {
        page: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true
        }
    },
    price_changes: [{
        date: Date,
        previous_offer_price : Number,
        current_offer_price : Number,
        previous_regular_price : Number,
        current_regular_price : Number
    }]
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product