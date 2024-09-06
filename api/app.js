const express = require('express')
const cors = require('cors')

const app = express()
const loginController = require('./controllers/login')

// app.use(express.json())
app.use(cors())

app.get('/api/ping', (req, res) => {
    res.json({ message: 'Pong!'})
})

app.use('/api/login', loginController)

module.exports = app
