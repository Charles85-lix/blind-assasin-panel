const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  coins: { type:Number, default:0 },
  isAdmin: { type:Boolean, default:false }
});

module.exports = mongoose.model("User", userSchema);
