const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authenticate = require("./middlewares/authenticate");
const login = require("./routes/login");
const menu = require("./routes/menu");
const user_details = require("./routes/user-details");
const payment = require("./routes/payment");
const signup = require("./routes/signup");
const order_status = require("./routes/order-status");

const app = express();

const setUpMongo = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.9xak4za.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`)
        mongoose.connection.on("error", err => {
            console.error(err);
        });
    }
    catch(err) {
        console.log("Failed to connect to mongo cluster");
        console.error(err);
    }
}
setUpMongo();

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/signup", signup)
app.use("/api/login", login);
app.use("/api/menu", authenticate, menu);
app.use("/api/user-details", authenticate, user_details);
app.use("/api/payment", authenticate, payment)
app.use("/api/order-status", authenticate, order_status);

app.listen(8080, () => {
    console.log("Server running on port 8080");
})