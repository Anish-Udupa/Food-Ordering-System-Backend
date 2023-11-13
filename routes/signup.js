const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const router = express.Router();

// ROUTE: /api/signup
router.post("/", async (req, res) => {
    const result = { success: false };

    const { name, address, email, phone, password } = req.body;
    if(name && address && email && phone && password) {
        const saltRounds = 10;
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt)
            
            const user = new UserModel({ name, address, email, phone, password_hash: hash });
            try {
                await user.save()
                result.success = true;
            }
            catch(err) {
                console.error(err);
            }
        }
        catch(err) {
            console.error(err);
        }
    }
    res.send(result);
})

module.exports = router;