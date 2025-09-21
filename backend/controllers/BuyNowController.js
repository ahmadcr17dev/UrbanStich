const BuyNow = require("../models/BuyNowModel");

const createBuyNow = async (req, res) => {
    try {
        await BuyNow.deleteMany({}); // clear previous BuyNow (only 1 product allowed)
        const buyNowProduct = new BuyNow(req.body);
        await buyNowProduct.save();
        res.status(201).json(buyNowProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBuyNow = async (req, res) => {
    try {
        const product = await BuyNow.findOne();
        if (!product) return res.status(404).json({ message: "No BuyNow product found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBuyNow, getBuyNow };