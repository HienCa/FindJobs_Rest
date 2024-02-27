const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require('../models/Chat');


module.exports = {
    getAllMessage: async (req, res) => {
        try {
            const pageSize = 12;
            const page = parseInt(req.query.page, 10) || 1;
    
            if (isNaN(page) || page < 1) {
                return res.status(400).json({ error: "Invalid page parameter" });
            }
    
            const skipMessages = (page - 1) * pageSize;
    
            const messages = await Message.find({ chat: req.params.id })
                .populate("sender", "username profile email")
                .populate({
                    path: "chat",
                    populate: {
                        path: "users",
                        select: "username profile email",
                    },
                })
                .sort({ createdAt: -1 })
                .skip(skipMessages)
                .limit(pageSize);
    
            res.status(200).json(messages);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Could not retrieve messages!" });
        }
    },
    
    sendMessgae: async (req, res) => {

        const { content, chatId, receiver, sender } = req.body;
        if (!content || !chatId) {
            consolog.log("Invalid data");
            return res.status(400).json("Invalid data");
        }

        var newMessage = {
            sender: sender,
            content: content,
            receiver: receiver,
            chat: chatId
        }

        try {
            var message = await Message.create(newMessage);
            message = await message.populate("sender", "username profile email");
            message = await message.populate("chat");
            message = await User.populate(message, {
                path: "chat.users",
                select: "username profile email",
            });

            await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })
            res.status(200).json(message);
        } catch (error) {
            res.status(400).json(error);
        }
    },



}
