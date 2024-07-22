const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    userName: {
        type: String,
        require: [true, 'Please fill in the username field'],
        unique: [true, 'This Username already exist']
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'Invalid email'],
        required: [true, 'Please fill in the email field'],
        unique: [true, 'This email already exist']
    },
    password: {
        type: String,
        require: [true, 'Please fill in the password field']
    },
    tokens: [],
    confirmed: {
        type: Boolean,
        default: false,
    },
    birth: {
        type: Date,
        require: [true, 'Please fill in the date field']
    },
    avatar_url: {
        type: String
    }
}, {timestamps: true});


UserSchema.method.toJSON = function(){
    const user = this._doc;
    delete user.__v;
    return user;
}

const User = mongoose.model('User', UserSchema);

module.exports= User;
