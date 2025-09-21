const mongoose =  require("mongoose");

const buyNowSchema = new mongoose.Schema({
    _id: String, // same as product._id
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 },
    mainImage: String,
    variation: {
        color: String,
        size: String,
        stock: Number,
    },
}, { timestamps: true });

module.exports = mongoose.model("BuyNow", buyNowSchema);