const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ message: 'Login route'})
})

module.exports = router
