const express  = require("express");
const { createBuyNow, getBuyNow } = require("../controllers/BuyNowController");

const router = express.Router();

router.post("/", createBuyNow);
router.get("/", getBuyNow);

module.exports = router;