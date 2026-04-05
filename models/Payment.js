const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: String,
  screenshot: String,
  coins: Number,
  price: Number,
  plan: String,
  status: { type:String, default:"pending" }
});

module.exports = mongoose.model("Payment", paymentSchema);
