const mongoose = require("mongoose");

const connectDb = () => {
    mongoose.connect(process.env.MONGO_DB_URI).then(() => {
        console.log("Successfully Connected To DB");
    }).catch((err) => {
        console.log("Database Connection Error: ", err);
    })
}

module.exports = connectDb;