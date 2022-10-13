const express = require('express')
const router = express.Router()
const AuthMiddleware = require('../middleware/auth')
const { handleDashbaord, handleLogin } = require('../controllers/main')

router.post('/login', handleLogin)
router.get('/dashboard', AuthMiddleware, handleDashbaord)

module.exports = router
