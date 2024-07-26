const Artist = require('../models/Artist')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET


const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({_id: payload._id, tokens: token});
        if (!user) {
            return res.status(401).send({msg: 'You are not authorized'})
        }
        req.user = user;
        next()
    } catch (error) {
        console.error(error);
        return res.status(500).send({error: 'There was a problem with the token'})
    }
}

const authenticationArtist = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, JWT_SECRET);
        const artist = await Artist.findOne({_id: payload._id, tokens: token});
        if (!artist) {
            return res.status(401).send({msg: 'You are not authorized'})
        }
        req.artist = artist;
        next()
    } catch (error) {
        console.error(error);
        return res.status(500).send({msg: 'There was a problem with the token'})
    }
}


module.exports = {authentication, authenticationArtist}