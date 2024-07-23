const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaType.ObjectId


const ArtistSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    albumNumber: {
        type: Number
    },
    tracksNumber: {
        type: Number
    },
    discografy: {
        type: String
    },
    artistPhoto: {
        type: String
    },
    albumId:[{type: ObjectId, ref: 'Album'}],
    }
)

ArtistSchema.method.toJSON = function(){
    const artist = this._doc;
    delete artist._v;
    return artis;
}

const Artist = mongoose.model('Artist', ArtistSchema)

module.exports = Artist