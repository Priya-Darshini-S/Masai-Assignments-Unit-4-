const express = require("express");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post.model");
const authenticate = require("../middlewares/authentication")



const router = express.Router();


router.post(
    "/", authenticate, 
    body("title").notEmpty().withMessage("Title is Required"),
    body("body").notEmpty().withMessage("Body required"),
    body("user").notEmpty().withMessage("User_ID is Required"),
    async (req, res) => {
    const errors =validationResult(req);
    if(!errors.isEmpty()) {
        let newErrors = errors.array().map(({ msg, param, location }) => {
            return {
                [param]:msg,
            };
        });
        return res.status(400).json({ errors: newErrors });
    }
    try {
        const user = req.user;
      const posts = await Post.create({
        title: req.body.title,
        body: req.body.body,
        user: user.user._id
    });
  
      return res.status(201).send(posts);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

router.get("/", async (req, res) => {
    try{
        const posts = await posts.find().lean().exec();
        return res.status(201).send({posts});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

router.get("/:id", async (req, res) => {
    try{
        const posts = await posts.findById(req.params.id).lean().exec();
        return res.status(201).send(posts);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.patch("/:id", async (req, res) => {
    try{
        const posts = await posts.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(posts);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const posts = await posts.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(posts);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

module.exports = router;

