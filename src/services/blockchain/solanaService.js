const { PublicKey, Connection, clusterApiUrl } = require("@solana/web3.js");
const Subscription = require("../../models/Subscription");
const {sendEmail} = require("../email/emailService");

const monitoredAddresses = new Set();
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const monitorSolanaAddress = async (address) => {
    if (monitoredAddresses.has(address.toLowerCase())) {
        return;
    }

    monitoredAddresses.add(address.toLowerCase());

    const publicKey = new PublicKey(address);

    connection.onAccountChange(publicKey, async () => {
        const subscriptions = await Subscription.find({ walletAddress: address, chain: "sol" });

        for (const subscription of subscriptions) {
            console.log(`Transaction detected for ${address}`);
            const message = `Transaction detected for ${address}`;
            await sendEmail(subscription.userEmail, "Wallet Alert", message);
        }
    });
};

const startSolanaMonitoring = async () => {
    const subscriptions = await Subscription.find({ chain: "sol" });
    subscriptions.forEach(sub => monitorSolanaAddress(sub.walletAddress));
};

module.exports = { startSolanaMonitoring, monitorSolanaAddress };
