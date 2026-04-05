const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb+srv://Ceelx:CharlesB332816@cluster0.pytm7e8.mongodb.net/blindassasin?retryWrites=true&w=majority")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/auth", require("./routes/auth"));
app.use("/payment", require("./routes/payment"));
app.use("/server", require("./routes/server"));

app.listen(3000, ()=>console.log("Server running on port 3000"));
