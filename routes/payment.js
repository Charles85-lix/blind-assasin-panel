const router = require("express").Router();
const multer = require("multer");
const Payment = require("../models/Payment");
const User = require("../models/User");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + ".jpg")
});
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req,res)=>{
  const coins = parseInt(req.body.coins);

  let price=0, plan="";

  if(coins===20){ price=150; plan="2GB RAM / 2 Cores"; }
  if(coins===45){ price=320; plan="3GB RAM / 3 Cores"; }
  if(coins===70){ price=500; plan="4GB RAM / 4 Cores"; }

  const payment = new Payment({
    userId:req.body.userId,
    screenshot:req.file.path,
    coins,
    price,
    plan
  });

  await payment.save();
  res.json({message:"Payment submitted"});
});

router.get("/all", async (req,res)=>{
  res.json(await Payment.find());
});

router.post("/approve", async (req,res)=>{
  const payment = await Payment.findById(req.body.paymentId);

  if(payment.status==="approved"){
    return res.json({message:"Already approved"});
  }

  payment.status="approved";
  await payment.save();

  const user = await User.findById(payment.userId);
  user.coins += payment.coins;
  await user.save();

  res.json({message:"Approved"});
});

module.exports = router;
