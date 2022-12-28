const { Router } = require('express')
const ApiController = require('../controllers/api.controller')

const router = new Router()

router.get('/getData', ApiController.getData)
router.post('/fundwallet', ApiController.fundWallet)
router.post('/invest', ApiController.invest)
router.post('/withdraw', ApiController.withdraw)
router.get('/getUsers', ApiController.getUsers)

module.exports = router
