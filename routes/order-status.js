const express = require("express");
const BillModel = require("../models/BillModel");
const UserModel = require("../models/UserModel");
const router = express.Router();

// ROUTE: /api/order-status
router.get("/", async (req, res) => {
    const user_id = req.user_data.id;
    const bill_id = req.query.bill_id;
    const result = { success: false };

    if(bill_id && user_id) {
        try {
            const bill = await BillModel.findOne({ _id: bill_id, user_id: user_id }).exec();
            const user = await UserModel.findOne({ _id: user_id }).exec();

            if(bill && user) {
                result.user_data = user;
                result.bill_data = bill;
                result.success = true;
            }
        }
        catch(err) {
            console.error(err);
        }
    }
    res.json(result);
})

module.exports = router