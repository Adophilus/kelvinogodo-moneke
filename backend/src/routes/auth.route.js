const { Router } = require('express')
const AuthController = require('../controllers/auth.controller')

const router = new Router()

router.get('/verify', AuthController.verifyUser)
router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)

module.exports = router
