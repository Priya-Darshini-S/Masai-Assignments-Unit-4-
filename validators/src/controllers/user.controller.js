const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const User = require("../models/user.model");

router.post(
    "/",
    body("first_name").notEmpty().withMessage("First Name is Required"),
    body("last_name").notEmpty().withMessage("Last Name is Required"),
    body("email").notEmpty().withMessage("Email required").isEmail().withMessage("Email must be a valid email address."),
    body("pincode").notEmpty().withMessage("Pincode required").isLength({ min: 6, max:6 }).withMessage("Pincode must be valid."),
    body("age").notEmpty().withMessage("Age required").isInt({ min: 1, max:100}).withMessage("Age must be valid."),
    body("gender").notEmpty().withMessage("Gender required").isIn(['M', 'F', "Male", "Female", "Others"]).withMessage("Gender must be valid."),

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
      const user = await User.create(req.body);
  
      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
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

