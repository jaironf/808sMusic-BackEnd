const express = require('express')
const router = express.Router()
const {authentication, authenticationArtist} = require('../middleware/authentication');
const ArtistController = require('../controllers/ArtistController');


router.post('/', ArtistController.registerArtist)
router.post('/loginartist', ArtistController.loginArtist)
router.delete('/logoutartist', authenticationArtist, ArtistController.logout)
router.get('/name/:name', authenticationArtist, ArtistController.getArtistByName)
router.delete('/', authenticationArtist, ArtistController.deleteArtist)

module.exports = router;