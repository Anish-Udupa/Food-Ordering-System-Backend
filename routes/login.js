const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
require("dotenv").config();

const router = express.Router();

const generateAccessToken = ({id, email}) => {
    return jwt.sign({id, email}, process.env.TOKEN_SECRET, { expiresIn: `${2*60*60}s`});
}

// ROUTE: /api/login
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    const result = {
        success: false,
    }
    try {
        const user = await UserModel.findOne({email}).exec();
        // console.log(user);
        if(user && user._id && user.email && user.password_hash) {
            const hash_match = await bcrypt.compare(password, user.password_hash);
            // console.log(hash_match);
            if(hash_match === true) {
                const token = generateAccessToken({id: user._id, email: user.email});
                res.cookie("token", token, { maxAge: 2*60*60*1000, httpOnly: true, sameSite: 'none', secure: true });
                result.success = true;
            }
        }
    }
    catch(err) {
        console.log(err);
    }
    res.send(result);
})

module.exports = router;