const { ethers } = require("ethers");
const Subscription = require("../../models/Subscription");
const {sendEmail} = require("../email/emailService");

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_PROVIDER);

const monitorAddress = async (address) => {
    provider.on(address, async (log) => {
        const subscriptions = await Subscription.find({walletAddress: address});
        for(const subscription of subscriptions) {
            const message = `Transaction detected for ${address}: ${log.transactionHash}`;
            await sendEmail(subscription.userEmail, "Wallet Alert", message);
        }
    })
}

const startMonitoring = async () => {
    const subscriptions = await Subscription.find();
    subscriptions.forEach(sub => monitorAddress(sub.walletAddress));
};

module.exports = { startMonitoring };