const { findSubscription, addSubscription, unsubscribeWallet } = require("../services/blockchain/ethereumService");

const subscribe = async (req, res) => {
    const { email, walletAddress, alertThreshold  } = req.body;
    try {
        const findSubscription = await findSubscription(email);
        if(!findSubscription){
            await addSubscription(email, walletAddress, alertThreshold);
            res.status(201).json({ message: "Subscription adeed successfully!" });
        }
        res.status(400).json({message: "Subscription already exists!"})
    } catch (error) {
        console.log("Error: ", error );
        res.status(500).json({ error: "Failed to create subscription." });
    }
}

const unsubscribe = async (req, res) => {
    const { email, walletAddress } = req.body;
    try {
        await unsubscribeWallet(email, walletAddress);
        res.status(200).json({ message: "Unsubscribed successfully!" });
    } catch (error) {
        console.log("Error: ", error );
        res.status(500).json({ error: "Failed to unsubscribe." });
    }
}

module.exports = {
    subscribe,
    unsubscribe
}