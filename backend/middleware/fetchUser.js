var jwt = require("jsonwebtoken");
const JWT_SECRET = '!@#thisisgoodjwtsecret$%^';


const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ error: "Authentication failed " });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    }
    catch (error) {
        res.status(401).json({ error: "Authentication failed " });
    }

}

module.exports = fetchUser;