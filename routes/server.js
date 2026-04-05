const router = require("express").Router();
const Server = require("../models/Server");
const multer = require("multer");

const storage = multer.diskStorage({
  destination:"uploads/",
  filename:(req,file,cb)=>cb(null,Date.now()+"-"+file.originalname)
});
const upload = multer({storage});

/* CREATE */
router.post("/create", async (req,res)=>{
  const { userId, name, plan } = req.body;

  if(!name) return res.json({message:"Name required"});

  let ram="", cpu="";
  if(plan==="basic"){ ram="2GB"; cpu="2 Cores"; }
  if(plan==="mid"){ ram="3GB"; cpu="3 Cores"; }
  if(plan==="pro"){ ram="4GB"; cpu="4 Cores"; }

  const server = new Server({userId,name,ram,cpu});
  await server.save();

  res.json({message:"Created"});
});

/* GET */
router.get("/:userId", async (req,res)=>{
  res.json(await Server.find({userId:req.params.userId}));
});

/* UPLOAD FILE */
router.post("/upload", upload.single("file"), async (req,res)=>{
  const server = await Server.findById(req.body.serverId);
  server.files.push(req.file.filename);
  await server.save();
  res.json({message:"File uploaded"});
});

/* STARTUP */
router.post("/startup", async (req,res)=>{
  const server = await Server.findById(req.body.serverId);
  server.startup = req.body.startup;
  await server.save();
  res.json({message:"Startup set"});
});

/* START */
router.post("/start", async (req,res)=>{
  const server = await Server.findById(req.body.serverId);

  if(server.files.length===0)
    return res.json({message:"Upload files first"});

  if(!server.startup)
    return res.json({message:"Set startup file"});

  server.status="running";
  server.logs.push("Server started");
  await server.save();

  res.json({message:"Started"});
});

/* STOP */
router.post("/stop", async (req,res)=>{
  const server = await Server.findById(req.body.serverId);
  server.status="stopped";
  server.logs.push("Server stopped");
  await server.save();
  res.json({message:"Stopped"});
});

/* RESTART */
router.post("/restart", async (req,res)=>{
  const server = await Server.findById(req.body.serverId);
  server.status="running";
  server.logs.push("Server restarted");
  await server.save();
  res.json({message:"Restarted"});
});

module.exports = router;
