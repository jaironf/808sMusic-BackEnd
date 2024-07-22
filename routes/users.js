const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const {authentication} = require('../middleware/authentication')


router.post('/', UserController.register)
router.post('/login', UserController.login)
router.delete('/logout', authentication, UserController.logout)
router.get('/id/:_id', authentication, UserController.getOnline)
router.get('/userName/:userName', authentication, UserController.getByUserName)
router.delete('/', authentication, UserController.deleteUser)

module.exports = router