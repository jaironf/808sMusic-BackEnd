const User = require('../models/User');
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const bcrypt = require('bcrypt')



const UserController = {
    async register(req, res){
        try {
            const newUser = await User.create(req.body)
            res.status(201).send({msg: 'User created successfully', newUser})
            const password = await bcrypt.hashSync(req.body.password, 10);
                const user = await User.create({
                    ...req.body,
                    password,
                });
        } catch (error) {
            console.error(error);
        }
    },
    async login(req, res){
        try {
            const user = await User.findOne({
                email: req.body.email,
                userName: req.body.userName,
            })
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({msg: `Welcome ${user.name, token}`})
        } catch (error) {
            console.error(error);
        }
    },
}




module.exports = UserController