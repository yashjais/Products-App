const express = require('express')
const setUPDb = require('./config/database')
const router = require('./config/routes')

const app = express()
const port = 3010

app.use('/', router)

setUPDb()

app.listen(port, () => {
    console.log('listening to the db', port)
})