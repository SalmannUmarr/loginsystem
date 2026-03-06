const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const connectDB = require("./config/db");
const User = require("./classes/User");

const app = express();

// connect to MongoDB
connectDB();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));

// home route
app.get("/", (req, res) => {
    res.send("Login System Running");
});

// register route
app.post("/register", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = new User(username, password);

    const result = await user.register();

    res.send(result);

});

// start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});