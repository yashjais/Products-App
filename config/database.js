const mongoose = require('mongoose')

const setUPDb = () => {
    mongoose.connect('mongodb://localhost:27017/greendeck-task',  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        .then(res => console.log('connected to the db'))
        .catch(err => console.log(err))
}

module.exports = setUPDb