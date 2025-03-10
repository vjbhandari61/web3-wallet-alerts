const { unsubscribeWallet, addSubscription, findSubscription } = require("../services/subscription/subscriptionService");
const { monitorAddress } = require("../services/blockchain/ethereumService");
const Subscription = require("../models/Subscription");
const { monitorSolanaAddress } = require("../services/blockchain/solanaService");

const subscribe = async (req, res) => {
    const { email, walletAddress, alertThreshold, chain } = req.body;

    try {
        const subscription = await findSubscription(email, walletAddress, chain);
        if(!subscription){
            await Subscription.create({ userEmail: email, walletAddress, alertThreshold, chain });
        }
        if(chain == "eth") {
            await monitorAddress(walletAddress);
        } else {
            await monitorSolanaAddress(walletAddress)
        }

        return res.status(201).json({ message: "Subscription created successfully!" });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: "Failed to create subscription." });
    }
}

const unsubscribe = async (req, res) => {
    const { email, walletAddress } = req.body;
    try {
        await unsubscribeWallet(email, walletAddress);
        return res.status(200).json({ message: "Unsubscribed successfully!" });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: "Failed to unsubscribe." });
    }
}

module.exports = {
    subscribe,
    unsubscribe
}