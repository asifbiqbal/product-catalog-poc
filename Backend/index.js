const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


mongoose
  .connect("mongodb://localhost:27017/product-catalog", {})
  .then(() => console.log("Connected to MongoDB (product-catalog)"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/products", productRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
