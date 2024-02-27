const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require('../models/Chat');


module.exports = {
    accessChat: async (req, res) => {
        const { userId, curentId } = req.body;
        if (!userId) {
            res.status(400).json("Invalid user id");
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                {
                    users: { $elemMatch: { $eq: curentId } },
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
            res.json(isChat[0]);
        } else {
            var chatData = {
                chatName: curentId,
                isGroupChat: false,
                users: [
                    curentId, userId
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
    getChats: async (req, res) => {
        try {
            const userId = req.params.id;
    
            const results = await Chat.find({ users: { $elemMatch: { $eq: req.params.id } } })

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
    
            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to retrieve chats" });
        }
    },

    getChat: async (req, res) => {
        try {
            console.log("Chat ID:", req.params.id);

            const chatId = req.params.id;

            const chat = await Chat.findOne()
                .populate("users", "-password")
                .sort({ updatedAt: -1 });

            if (!chat) {
                return res.status(404).json({ error: "Chat not found" });
            }

            res.status(200).json(chat);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to retrieve chat" });
        }
    }


}
