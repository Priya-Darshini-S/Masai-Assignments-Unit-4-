const express = require("express");
const router = express.Router();

const Theatre = require("../models/theatre.model");

router.post("/", async (req, res) => {
    try {
      const theatre = await Theatre.create(req.body);
  
      return res.status(201).send(theatre);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

router.get("/", async (req, res) => {
    try{
        const theatres = await Theatre.find().lean().exec();
        return res.status(201).send({theatres});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

router.get("/:id", async (req, res) => {
    try{
        const theatre = await Theatre.findById(req.params.id).lean().exec();
        return res.status(201).send(theatre);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.patch("/:id", async (req, res) => {
    try{
        const theatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(theatre);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const theatre = await Theatre.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(theatre);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

module.exports = router;

