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
            console.log(user);

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
    verifyToken(req, res, () => {
        // chua log ra isAdmin

        // {
        //     userId: '65d60818ba94d68f7e54aa2c',
        //         iat: 1708531108,
        //             exp: 1708534708
        // }

        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are restriced from performing this operation.")
        }
    })
}


module.exports = { verifyToken, verifyAndAuthorization, verifyAdmin }