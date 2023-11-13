const express = require("express");
const BillModel = require("../models/BillModel");
const router = express.Router();

// ROUTE: /api/payment
router.post("/", async (req, res) => {
    const { card, bill } = req.body;
    const user_id = req.user_data.id;
    
    const result = {
        success: false,
    }
    if(card && card.card_no && card.expiry && card.cvv && bill) {
        // Write logic to validate card here

        // Payment accepted
        // console.log(bill);
        const mongo_bill = new BillModel({
            user_id,
            items: bill.items.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            total_cost: bill.total_cost,
            order_status: 0,
        });
        const res_bill = await mongo_bill.save()
        result.bill_id = res_bill._id;
        result.success = true;
    }
    res.json(result);
})

module.exports = router;