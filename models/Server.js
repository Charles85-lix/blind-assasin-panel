const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  userId: String,
  name: { type:String, required:true },
  ram: String,
  cpu: String,
  status: { type:String, default:"stopped" },
  startup: { type:String, default:"" },
  files: { type:Array, default:[] },
  logs: { type:Array, default:[] }
});

module.exports = mongoose.model("Server", serverSchema);
