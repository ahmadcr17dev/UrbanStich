const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        await mongoose.connect("mongodb+srv://ahmad17:1041@cluster0.n2ywdp9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database Connected");
    } catch (error) {
        console.log("Error in connection: ", error);
        process.exit(1);
    }
}

module.exports = connectdb;