const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require('../models/Chat');


module.exports = {
    accessChat: async (req, res) => {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json("Invalid user id");
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                {
                    users: { $elemMatch: { $eq: req.user.id } },
                },
                {
                    users: { $elemMatch: { $eq: userId } },
                },
            ]
        }).populate("users", "-password").populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "username profile email"
        });

        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            var chatData = {
                chatName: req.user.id,
                isGroupChat: false,
                users: [
                    req.user.id, userId
                ]
            }
        }
        try {

            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id })
                .populate("users", "-password");
            res.status(200).json(fullChat);
        } catch (error) {
            res.status(500).json({ error: "Failed to create the chat!" });
        }
    },
    getChat: async (req, res) => {
        try {
            const results = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .populate({
                    path: "latestMessage",
                    populate: {
                        path: "sender",
                        select: "username profile email"
                    }
                })
                .sort({ updatedAt: -1 });
    
            res.status(200).send(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to retrieve chat" });
        }
    },
    



}
