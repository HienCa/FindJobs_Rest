const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require('../models/Chat');


module.exports = {
    getAllMessgae: async (req, res) => {

        try {
            const pageSize = 12;
            const page = req.query.page || 1

            const skipMessages = (page - 1) * pageSize;
            var messages = await Message.find({ chat: req.params.id })
                .populate("sender", "username profile email")
                .populate("chat")
                .sort({ createdAt: -1 })
                .skip(skipMessages)
                .limit(pageSize);

            messages = await User.populate(messages, {
                path: "chat.users",
                select: "username profile email",
            });

            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: "Could not retrieve messages!" });
        }
    },
    sendMessgae: async (req, res) => {

        const { content, chatId, receiver } = rq.body;
        if (!content || !chatId) {
            consolog.log("Invalid data");
            return res.status(400).json("Invalid data");
        }

        var newMessage = {
            sender: req.params.id,
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
