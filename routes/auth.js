const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req,res)=>{
  const { email, password } = req.body;

  const exists = await User.findOne({email});
  if(exists) return res.json({message:"User exists"});

  const user = new User({email,password});
  await user.save();

  res.json({message:"Registered"});
});

router.post("/login", async (req,res)=>{
  const { email, password } = req.body;

  const user = await User.findOne({email,password});
  if(!user) return res.json({message:"Invalid login"});

  res.json({
    userId:user._id,
    isAdmin:user.isAdmin
  });
});

router.get("/user/:id", async (req,res)=>{
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.post("/claim", async (req,res)=>{
  const user = await User.findById(req.body.userId);
  user.coins += 2;
  await user.save();
  res.json({message:"2 coins added"});
});

module.exports = router;
