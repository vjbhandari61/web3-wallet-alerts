const Subscription = require("../../models/Subscription");

const findSubscription = async (email) => {
    return Subscription.findOne({userEmail: email});    
}

const addSubscription = async (email, walletAddress, alertThreshold) => {
    return Subscription.create({userEmail: email, walletAddress, alertThreshold});
}

const unsubscribeWallet = async (email, walletAddress) => {
    return Subscription.deleteOne({userEmail: email, walletAddress});
}

module.exports = {
    findSubscription,
    addSubscription,
    unsubscribeWallet
}