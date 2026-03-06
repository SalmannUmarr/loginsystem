const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
    res.send("Login System Running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});