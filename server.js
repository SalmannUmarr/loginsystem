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


// REGISTER ROUTE
app.post("/register", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = new User(username, password);

    const result = await user.register();

    res.send(result);

});


// LOGIN ROUTE
app.post("/login", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = new User(username, password);

    const success = await user.login();

    if (success) {

        req.session.user = username;

        res.send("Login successful");

    } else {

        res.send("Invalid credentials");

    }

});


// AUTHENTICATION MIDDLEWARE
function authMiddleware(req, res, next) {

    if (req.session.user) {
        next();
    } else {
        res.send("Please login first");
    }

}


// PROTECTED DASHBOARD ROUTE
app.get("/dashboard", authMiddleware, (req, res) => {

    res.send("Welcome " + req.session.user);

});


// start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});