const { ethers } = require("ethers");
const Subscription = require("../../models/Subscription");
const {sendEmail} = require("../email/emailService");

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_PROVIDER);

const monitoredAddresses = new Set();

const monitorAddress = async (address) => {
    if (monitoredAddresses.has(address.toLowerCase())) {
        return;
    }

    monitoredAddresses.add(address.toLowerCase());

    provider.on("block", async (blockNumber) => {
        const block = await provider.getBlock(blockNumber);
        for (const tx of block.transactions) {
            const transactionDetails = await provider.getTransaction(tx);
            if (transactionDetails && transactionDetails.to && transactionDetails.to.toLowerCase() === address.toLowerCase()) {
                console.log("Transaction to address found:", transactionDetails.to);
                const subscriptions = await Subscription.find({ walletAddress: address });
                for (const subscription of subscriptions) {
                    const message = `Transaction detected for ${address}: ${transactionDetails.hash}`;
                    await sendEmail(subscription.userEmail, "Wallet Alert", message);
                }
            }
        }
    });
};

const startMonitoring = async () => {
    const subscriptions = await Subscription.find();
    subscriptions.forEach(sub => monitorAddress(sub.walletAddress));
};

module.exports = { startMonitoring, monitorAddress };