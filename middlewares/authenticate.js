const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            if(err) {
                console.error(err);
                res.status(403).send({ success: false });
            }
            else {
                req.user_data = data;
                next();
            }
        })
    }
    else {
        res.status(401).send({ success: false });
    }
}

module.exports = authenticate;