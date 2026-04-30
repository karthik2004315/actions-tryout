const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require("./config/db")
connectDB();

const app = express()

app.use(cors({
    origin:true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.get("/", (req, res) => {
    res.send("Api running")
});
app.listen(5000, () => {
    console.log("Server running on port 5000")
});