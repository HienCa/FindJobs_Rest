const User = require('../models/User');
const CryptoJs = require('crypto-js');

module.exports = {
    createUser: async (req, res) => {
        const newUser = new User(req.body);

        try {
            const createdUser = await newUser.save();
            createdUser.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY);
            const { __v, createdAt, updatedAt, ...newUserInfo } = createdUser._doc;

            res.status(200).json(newJobInfo);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateUser: async (req, res) => {

        if (req.body.password) {
            req.body.password == CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY)
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id, {
                $set: req.body
            }, { new: true }
            );
            const { password, __v, createdAt, updatedAt, ...userData } = updatedUser._doc

            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }

    },
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.user.id)

            res.status(200).json("Account Success Delete.");

        } catch (error) {
            res.status(500).json(error);
        }
    }
    ,
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            const { password, __v, createdAt, updatedAt, ...userData } = user._doc

            res.status(200).json(userData);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllUser: async (req, res) => {
        try {
            const users = await User.find().select('-password');
            console.log(users);
            res.status(200).json(users);

        } catch (error) {
            res.status(500).json(error);
        }
    }

}
