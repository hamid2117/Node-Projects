const express = require('express')
const router = express.Router()

const { handleDashbaord, handleLogin } = require('../controllers/main')

router.post('/login', handleLogin)
router.get('/dashboard', handleDashbaord)

module.exports = router
