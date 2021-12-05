const express = require("express");

//const sendMail = require("../utils/send_mail")

const transporter = require("../configs/mail");

const User = require("../models/user.model");

const router = express.Router();
 
router.get("/", async (req, res) => {
    try {

        const page = +req.query.page || 1;
        const size = +req.query.size || 3;

        const skip = (page -1)* size;


        const users = await User.find().skip(skip).limit(size).lean().exec();
        
        const totalPages = Math.ceil((await User.find().countDocuments()) / size);
        return res.send({users, totalPages});
     //   console.log('total:', total)
    }catch(e){
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const users = await User.create(req.body);
        const message = {
            
            from: "sender@server.com",
            to: req.body.email,
            subject: ` Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
            text: `Hi ${req.body.first_name}, Please confirm your email address`,
            html: `<h1>Hi ${req.body.first_name}, Please confirm your email address</h1>`
        };

        transporter.sendMail(message);

        const userList = await User.find();
        userList.forEach( (eachuser) => {

            if(eachuser.role === "admin"){
                let mail = eachuser.email;
                const admin_message = {
                    from: "sender@server.com",
                    to: mail,
                    subject: `${req.body.first_name} ${req.body.last_name} has registered with us`,
                    text: `Please welcome ${req.body.first_name} ${req.body.last_name}`,
                    html: `<h1>Please welcome ${req.body.first_name} ${req.body.last_name}</h1>`
                };
                transporter.sendMail(admin_message);
            }
        });

        return res.status(200).json(users);
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


