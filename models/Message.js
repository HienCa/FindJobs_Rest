const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        trim: true,
    },
    receiver: {
        type: String,
        trim: true,
    },
    gif: {
        type: String, 
        trim: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    readBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
}, { timestamps: true })
module.exports = mongoose.model("Message", MessageSchema);