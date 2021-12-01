const express = require("express");

const transporter = require("../configs/mail");

const User = require("../models/user.model");

const router = express.Router();
 
router.get("/", async (req, res) => {
    try {

        const page = +req.query.page || 1;
        const size = +req.query.size || 3;

        const skip = (page -1)* size;


        const users = await User.find().skip(skip).limit(size).lean().exec();
        
        return res.send(users);
    }catch(e){
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const users = await User.create(req.body);

        const message = {
            from: "a@a.com",
            to: "b@b.com",
            subject: `Welcome to masai system ${req.body.first_name}`,
            text: `Hi ${req.body.first_name}, Please confirm your email address`,
            html: "<h1>Hi, Please confirm your email address</h1>"
        };
        
        transporter.sendMail(message);

        return res.status(200).json({users});
    }catch(e){
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(user);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

module.exports = router;