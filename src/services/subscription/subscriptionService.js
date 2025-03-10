const Subscription = require("../../models/Subscription");

const findSubscription = async (email, walletAddress, chain) => {
    return Subscription.findOne({userEmail: email, walletAddress, chain});    
}

const addSubscription = async (email, walletAddress, alertThreshold, chain) => {
    return Subscription.create({userEmail: email, walletAddress, alertThreshold, chain});
}

const unsubscribeWallet = async (email, walletAddress) => {
    return Subscription.deleteOne({userEmail: email, walletAddress});
}

module.exports = {
    findSubscription,
    addSubscription,
    unsubscribeWallet
}