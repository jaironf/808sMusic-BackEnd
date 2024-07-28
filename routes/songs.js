const express = require('express')
const router = express.Router()
const SongController = require('../controllers/SongController')
const {authenticationArtist} = require('../middleware/authentication')

router.post('/', authenticationArtist, SongController.create)

module.exports = router