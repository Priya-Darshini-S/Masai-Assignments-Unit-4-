const express = require("express");
const router = express.Router();

const Seat = require("../models/seat.model");

router.post("/", async (req, res) => {
    try {
      const seat = await Seat.create(req.body);
  
      return res.status(201).send(seat);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

router.get("/", async (req, res) => {
    try{
        const seats = await Seat.find().lean().exec();
        return res.status(201).send({seats});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

router.get("/:id", async (req, res) => {
    try{
        const seat = await Seat.findById(req.params.id).lean().exec();
        return res.status(201).send(seat);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.patch("/:id", async (req, res) => {
    try{
        const seat = await Seat.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(seat);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const seat = await Seat.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(seat);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

module.exports = router;

