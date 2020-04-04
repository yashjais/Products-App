const mongoose = require('mongoose')

const setUPDb = () => {
    mongoose.connect('mongodb+srv://yashjais:Pengu123@cluster0-wz7f8.mongodb.net/Products?retryWrites=true&w=majority',  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false, useCreateIndex: true })
    .then(res => {
        console.log('connected to db') 
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = setUPDb