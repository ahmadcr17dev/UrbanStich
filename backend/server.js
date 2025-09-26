const connectDB = require("./config/Database");
const express = require("express");
const app = express();
const authroute = require("./routes/AuthRoutes");
const productroute = require("./routes/ProductRoutes");
const cors = require("cors");
const path = require("path");

const PORT = 8080;
connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authroute);
app.use("/api/product", productroute);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));