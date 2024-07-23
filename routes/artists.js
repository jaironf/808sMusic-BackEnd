const express = require('express')
const router = express.Router()
const {authentication} = require('../middleware/authentication');
const ArtistController = require('../controllers/ArtistController');


router.post('/', ArtistController.registerArtist)



module.exports = router;