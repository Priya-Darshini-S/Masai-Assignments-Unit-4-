const express = require("express");
const router = express.Router();

const Student = require("../models/student.model");

router.post("/", async (req, res) => {
    try {
      const student = await Student.create(req.body);
  
      return res.status(201).send(student);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

router.get("/", async (req, res) => {
    try{
        const students = await Student.find().lean().exec();
        return res.status(201).send({students});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

router.get("/:id", async (req, res) => {
    try{
        const student = await Student.findById(req.params.id).lean().exec();
        return res.status(201).send(student);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.patch("/:id", async (req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(student);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(student);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});


router.get("/eval/:subject", async (req, res) => {
    try{
        const students = await Student.find().populate({path: ""}).lean().exec();
        return res.status(201).send({students});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})
