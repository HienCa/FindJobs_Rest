const express = require('express');
var cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require('dotenv');
// const bodyParser = require('body-parser');

const User = require('./models/User');
const Job = require('./models/Job');
const Bookmark = require('./models/Bookmark');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const jobRoute = require('./routes/job');
const bookmarkRoute = require('./routes/bookmark');
const chatRoute = require('./routes/chat');
const messageRoute = require('./routes/message');

const app = express();
const port = 3000;
const dbname = "FindJobs";
const uri = `mongodb+srv://admin:admin@accountingservices.pvk3r5s.mongodb.net/${dbname}?retryWrites=true&w=majority`;
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
// app.use(bodyParser.json());

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.send('Hello my friends')
})

app.use("/api/", authRoute)
app.use("/api/users", userRoute)
app.use("/api/jobs", jobRoute)
app.use("/api/bookmarks", bookmarkRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)

mongoose.connect(process.env.MONGODB_URI).then(() => {
    const server = app.listen(process.env.PORT || port, () => {
        console.log(`Accounting Services app is running on port http://localhost:${process.env.PORT || port}`);
    })
    console.log('Connected Accounting Services Mongodb')

    const io = require('socket.io')(server, {
        pingTimeout: 60000,
        cors: {
            origin: "https://findjobsrest-production.up.railway.app/"
        }
    });

    io.on("connection", (socket) => {
        console.log("connected to sockets")

        socket.on('setup', (userId) => {
            socket.join(userId);
            socket.broadcast.emit('online-user', userId)
            console.log(userId)
        });

        socket.on('typing', (room) => {
            console.log("typing");
            console.log("room");
            socket.to(room).emit('typing', room);
        });

        socket.on('stop typing', (room) => {
            console.log("stop typing");
            console.log("room");
            socket.to(room).emit('stop typing', room);
        });

        socket.on('join chat', (room) => {
            socket.join(room)
            console.log("User Joined : " + room);

        });

        socket.on('new message', (newMessageReceived) => {
            var chat = newMessageReceived.chat;
            var room = chat._id;
            var sender = newMessageReceived.sender;

            if (!sender || !sender._id) {
                console.log("Sender not defined!");
                return;
            }
            var senderId = sender._id;
            console.log(senderId + " message sender");
            const users = chat.users;

            if (!users) {
                console.log("Users not defined!");
                return;
            }

            socket.to(room).emit('message received', newMessageReceived);
            socket.to(room).emit('message sent', "New Message");
        });

        socket.on('disconnect', () => {
            console.log('user offline');
        });

        // socket.off('setup', () => {
        //     console.log('user offline');
        //     socket.leave(userId);
        // });
    })
}).catch((err) => {
    console.error(err)
});


