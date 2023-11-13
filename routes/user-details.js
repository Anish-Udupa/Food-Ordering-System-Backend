const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();

// ROUTE: /api/user-details
router.get("/", async (req, res) => {

    const user_id =req.user_data.id;
    const result = {
        success: false,
    }
    if(user_id) {
        const user = await UserModel.findOne({ _id: user_id }).exec();
        if(user) {
            result.user = { name: user.name, address: user.address, phone: user.phone };
            result.success = true;
        }
    }
    res.json(result);
})

module.exports = router;