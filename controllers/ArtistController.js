const Artist = require('../models/Artist')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {JWT_SECRET} = process.env 



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
    async loginArtist(req, res){
        try {
            const artist = await Artist.findOne({
                email: req.body.email
            });
            if (!artist) {
                return res.status(400).send({msg: 'Email or password are incorrect'})
            }
            const isMatch = bcrypt.compareSync(req.body.password, artist.password)
            if (!isMatch) {
                return res.status(400).send({msg: 'Email or password are incorrect'})
            }
            const token = jwt.sign({_id: artist._id}, JWT_SECRET)
            if (artist.tokens.length > 4) artist.tokens.shift()
            artist.tokens.push(token)
            await artist.save();
            res.send({msg: `Welcome ${artist.name}`, token})
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    async logout(req, res) {
        try {
            await Artist.findByIdAndUpdate(req.artist._id, {
                $pull: {tokens: req.headers.authorization},
            });
            res.send({msg: 'Successfully disconnected'})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'It seems that there was a problem when trying to disconnect'})
        }
    },
    async getArtistByName(req, res){
        try {
            if(req.params.name.length > 20) {
                return res.status(400).send({msg: 'Your search is very long'})
            }
            const name = new RegExp(req.params.name, 'i')
            const artist = await Artist.find({name})
            res.send(artist)
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    async deleteArtist(req, res) {
        try {
            await Artist.findOneAndDelete(req.artist._id);
            res.send({msg: 'Artist deleted'})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'There was a problem deleting the artist'})
        }
    }
}



module.exports = ArtistController;