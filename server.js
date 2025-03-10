require("dotenv").config();

const cors = require("cors");
const express = require("express");
const connectDb = require("./config/db")
const routes = require("./src/routes/subscriptionRoutes");
const { startMonitoring } = require("./src/services/blockchain/ethereumService");
const { startSolanaMonitoring } = require("./src/services/blockchain/solanaService");

const app = express();

app.use(cors());
app.use(express.json());

connectDb();
app.use("/api", routes);

startMonitoring();
startSolanaMonitoring();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Successfully Started At Port: ${PORT}`);
})