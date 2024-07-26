const mongoose = require('mongoose')
// const ObjectId = mongoose.SchemaType.ObjectId


const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please fill in the name field']
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'Invalid email'],
        required: [true, 'Please fill in the email field'],
        unique: [true, 'This email already exist']
    },
    password: {
        type: String,
        require: true
    },
    tokens: [],
    confirmed: {
        type: Boolean,
        default: false
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
    // albumId:[{type: ObjectId, ref: 'Album'}],
}, {timestamps: true})

ArtistSchema.method.toJSON = function(){
    const artist = this._doc;
    delete artist._v;
    return artis;
}

const Artist = mongoose.model('Artist', ArtistSchema)

module.exports = Artist