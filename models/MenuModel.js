const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
    title: String,
    desc: String,
    imgsrc: String,
    price: Number,
    category: String,
});

const MenuModel = mongoose.model("Menu", MenuSchema);
module.exports = MenuModel;