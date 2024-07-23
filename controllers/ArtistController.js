const Artist = require('../models/Artist')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env 



const ArtistController = {
    async registerArtist(req, res, next) {
        try {
            const password = bcrypt.hashSync(req.body.password, 10)
            const artist = await Artist.create({...req.body, password})
            res.status(201).send({msg: 'Artist account created successfully', artist})
        } catch (error) {
            next()
        }
    },

}



module.exports = ArtistController;