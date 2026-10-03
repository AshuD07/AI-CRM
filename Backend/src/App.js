const express = require("express");

const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());  //express.json() parses JSON request bodies so that we can access the data through req.body

app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);


app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("AI CRM Backend is running");
});

module.exports = app;