require("dotenv").config();

const express = require("express");
const User = require("../models/user.model");
const upload = require("../middleware/upload");
const jwt = require("jsonwebtoken")
const router = express.Router();

const newToken = (user)=> {
    return jwt.sign({ user: user}, `${process.env.JWT_ACCESS_KEY}`);
}


router.post("/register", upload.single("profileImage"), async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email}).lean().exec();
      if(user)
      return res.status(400).json({
          status: "failed",
          message: "Please provide different mail address",
      }); 

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profile_photo_url: req.file.path,
        roles: req.body.role
    });

      const token = newToken(user);
      res.status(201).json({user, token });

    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });



  router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});

        if(!user)
        return res.status(400).json({
            status: "failed",
            message: "Please provide valid email"
        });

        const match = await user.checkPassword(req.body.password);
        if(!match)
        return res.status(400).json({
            status: "failed",
            message: "Please provide correct email and password"
        });
       
        const token = newToken(user);
     
        res.status(201).json({ user,token });
    }
    catch(e){
        return res.status(500).json({ status:"failed", message: e.message });
    }
});
  

router.get("/", async (req, res) => {
    try{
        const users = await User.find().lean().exec();
        return res.status(201).send({users});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id).lean().exec();
        return res.status(201).send(user);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.patch("/:id", async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(user);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(user);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

module.exports = router;

