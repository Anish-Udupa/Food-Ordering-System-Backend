const mongoose = require("mongoose");

const BillSchema = mongoose.Schema({
    user_id: String,
    items: [{
        id: String,
        name: String,
        quantity: Number,
        price: Number,
    }],
    total_cost: Number,
    order_status: Number,   // 0 = accepted, 1 = being prepared, 2 = dispatched, 3 = delivered
});

const BillModel = mongoose.model("Bill", BillSchema);
module.exports = BillModel;