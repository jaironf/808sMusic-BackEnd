const mongoose = require('mongoose');
const Artist = require('./Artist');
const ObjectId = mongoose.SchemaType.ObjectId

const SongSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please fill in the name of the song']
    },
    releaseDate: {
        type: Date,
        require: [true, 'Please fill in the release date']
    },
    urlSong: {
        type: String,
        require: [true, 'Please upload de song']
    },
    lyric: {
        type: String,
    },
    artistId: {
        type: ObjectId,
        ref: Artist
    }
}, {timestamps: true})

SongSchema.method.toJSON = function(){
    const song = this._doc;
    delete song._v;
    return song;
}


const Song = mongoose.model('Song', SongSchema)

module.exports = Song