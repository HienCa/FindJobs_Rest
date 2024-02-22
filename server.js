const express = require('express');
var cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const User = require('./models/User');
const Job = require('./models/Job');
const Bookmark = require('./models/Bookmark');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const jobRoute = require('./routes/job');
const bookmarkRoute = require('./routes/bookmark');

const app = express();
const port = 3000;
const dbname = "FindJobs";
const uri = `mongodb+srv://admin:admin@accountingservices.pvk3r5s.mongodb.net/${dbname}?retryWrites=true&w=majority`;
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
// app.use(authRoute)

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.send('Hello my friends')
})

app.use("/api/", authRoute)
app.use("/api/users", userRoute)
app.use("/api/jobs", jobRoute)
app.use("/api/bookmarks", bookmarkRoute)


mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT || port, () => {
        console.log(`Accounting Services app is running on port http://localhost:${process.env.PORT || port}`);
    })
    console.log('Connected Accounting Services Mongodb')
}).catch((err) => {
    console.error(err)
})