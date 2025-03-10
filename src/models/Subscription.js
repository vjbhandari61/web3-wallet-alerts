const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    walletAddress: { type: String, required: true },
    alertThreshold: { type: Number, default: 0 },
    chain: {
        type: String,
        enum: ['eth', 'sol'],
        required: true
    },
    createdAt: { type: Date, default: Date.now }
}, {timestamps: true});

module.exports = mongoose.model("Subscription", subscriptionSchema);
