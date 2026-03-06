const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.get("/", (req, res) => {
    res.send("Login System Running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});