const User = require('../models/User');
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const bcrypt = require('bcrypt')



const UserController = {
    async register(req, res){
        try {
            const password = bcrypt.hashSync(req.body.password, 10)
            const user = await User.create({...req.body, password, role: 'user'})
            res.status(201).send({msg: 'User created successfully', user})
        } catch (error) {
            console.error(error);
        }
    },
    async login(req, res){
        try {
            const user = await User.findOne({
                email: req.body.email,
            });
            if (!user) {
                return res.status(400).send({msg: 'Email or password are incorrect'})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password)
            if (!isMatch) {
                return res.status(400).send({msg: 'Email or password are incorrect'})
            }
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({msg: `Welcome ${user.userName}`, token})
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: {token: req.header.authorization},
            });
            res.send({msg: 'Successfully disconnected'})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'It seems that there was a problem when trying to disconnect the user'})
        }
    },
    async getOnline(req, res) {
        try {
            const user = await User.findOne({_id: req.params._id})
            if (!user.online) {
                user.online = true;
                await user.save();
                return res.send({msg: `The user with the Id ${req.params._id} is online`})
            } else {
                return res.send({msg: `The user with the Id ${req.params._id} is offline`})
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    async getByUserName(req, res) {
        try {
            if(req.params.userName.length > 20) {
                return res.status(400).send({msg: 'Your search is very long'})
            }
            const userName = new RegExp(req.params.userName, 'i')
            const user = await User.find({userName})
            res.send(user)
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    async deleteUser(req, res) {
        try {
            await User.findByIdAndDelete(req.user._id);
            res.send({ message: "User deleted" });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem deleting the user",
            });
        }
    }
}




module.exports = UserController