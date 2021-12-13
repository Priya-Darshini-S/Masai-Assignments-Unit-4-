const express = require("express");
const router = express.Router();

const show = require("../models/shows.model");

router.post("/", async (req, res) => {
    try {
      const show = await show.create(req.body);
  
      return res.status(201).send(show);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

router.get("/", async (req, res) => {
    try{
        const shows = await Show.find().lean().exec();
        return res.status(201).send({shows});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

router.get("/:id", async (req, res) => {
    try{
        const show = await Show.findById(req.params.id).lean().exec();
        return res.status(201).send(show);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.patch("/:id", async (req, res) => {
    try{
        const show = await Show.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(show);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const show = await Show.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(show);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

module.exports = router;

