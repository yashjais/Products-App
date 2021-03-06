const express = require('express')
const setUPDb = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')

const app = express()
const port = 3010

app.use(express.json())
app.use(cors())
app.use('/', router)

setUPDb()

app.listen(port, () => {
    console.log('listening on the port', port)
})