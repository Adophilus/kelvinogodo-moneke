const { Router } = require('express')
const frontendRoutes = require('./frontend.route')
const authRoutes = require('./auth.route')
const apiRoutes = require('./api.route')

const router = new Router()

router.use('/frontend', frontendRoutes)
router.use('/api', authRoutes)
router.use('/api', apiRoutes)

module.exports = router
