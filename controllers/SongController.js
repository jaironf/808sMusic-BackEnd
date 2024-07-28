const Song = require('../models/Song')
const Artist = require('../models/Artist')
require('dotenv').config()


const SongController = {
    async create(req, res){
        try {
            const song = await Song.create({
                ...req.body,
                artistId: req.artist._id
            })
            const createSong = await Song.create(song);
            await Artist.findByIdAndUpdate(req.params._id, {
                $push: {songId: createSong._id}})
            res.status(201).send({msg: 'Congratulations, you just uploaded a song', createSong})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'There was a problem creating the song', error})
        }
    },
    
}



module.exports = SongController;