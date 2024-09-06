const express = require('express')
const cors = require('cors')

const app = express()
const loginController = require('./controllers/login')

app.use(cors())
app.use(express.static('dist/browser'))
app.use(express.json())

app.get('/api/ping', (req, res) => {
    res.json({ message: 'Pong!'})
})

app.use('/api/login', loginController)

module.exports = app
