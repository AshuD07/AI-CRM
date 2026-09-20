const express = require("express");

const app = express();

app.use((req, res, next) => {
    console.log("Middleware executed");
    next();
});

app.get("/", (req, res) => {
    res.send("AI CRM Backend is running");
});

module.exports = app;