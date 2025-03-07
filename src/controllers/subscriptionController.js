const { unsubscribeWallet, addSubscription, findSubscription } = require("../services/subscription/subscriptionService");
const { monitorAddress } = require("../services/blockchain/ethereumService");

const subscribe = async (req, res) => {
    const { email, walletAddress, alertThreshold } = req.body;

    try {
        const subscription = await findSubscription(email);
        if (!subscription) {
            await addSubscription(email, walletAddress, alertThreshold);
            await monitorAddress(walletAddress);
            return res.status(201).json({ message: "Subscription added successfully!" });
        }
        return res.status(400).json({ message: "Subscription already exists!" });
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