require("dotenv").config();

const cors = require("cors");
const express = require("express");
const connectDb = require("./config/db")

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

// app.use('/api');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Successfully Started At Port: ${PORT}`);
})