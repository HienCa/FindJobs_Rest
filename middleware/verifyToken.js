const User = require('../models/User');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) res.status(403).json('Invalid token')

            req.user = user;
            console.log(user)

            next()
        })
    } else {
        return res.status(401).json("You are not authenticated.")
    }
}


const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user);
        if (req.user.userId === req.params.id) {
            next();
        } else {
            res.status(403).json("You are restriced from performing this operation.")
        }
    })


}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, async () => {

        const userId = req.user.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(500).json({ error: "Error verifying user." });
        } else {
            if (user.isAdmin) {
                next();
            } else {
                res.status(403).json({ error: "You are restricted from performing this operation." });
            }
        }

    });
};



module.exports = { verifyToken, verifyAndAuthorization, verifyAdmin }