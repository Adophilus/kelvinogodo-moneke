const express = require('express')
const Router = express.Router
const path = require('path')
const serveStatic = require('serve-static')

const router = new Router()

router.use(serveStatic(path.join(process.cwd(), '/dist')))
router.get(
  [
    '/',
    '/dashboard',
    '/dashboard/*',
    '/login',
    '/signUp',
    '/about',
    '/faqs',
    '/contact',
    '/admin'
  ],
  (_, res) => res.sendFile(path.join(process.cwd(), '/dist/index.html'))
)
router.use('/static', express.static('dist/static'))

module.exports = router
