const express = require("express");
const router = express.Router();

const Eval = require("../models/evaluation.model");

router.post("/", async (req, res) => {
    try {
      const eval = await Eval.create(req.body);
  
      return res.status(201).send(eval);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

router.get("/", async (req, res) => {
    try{
        const eval = await Eval.find().lean().exec();
        return res.status(201).send({eval});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

router.get("/:id", async (req, res) => {
    try{
        const eval = await Eval.findById(req.params.id).lean().exec();
        return res.status(201).send(eval);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.patch("/:id", async (req, res) => {
    try{
        const eval = await Eval.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(eval);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const eval = await Eval.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(eval);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

module.exports = router;

