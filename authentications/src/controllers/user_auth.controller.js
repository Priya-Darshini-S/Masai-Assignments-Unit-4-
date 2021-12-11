require("dotenv").config();

//const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const newToken = (user) => {
 return jwt.sign({ user: user }, `${process.env.JWT_ACCESS_KEY}`);
}

const register = async (req, res) => {
try{
    let user = await User.findOne({email: req.body.email}).lean().exec()
    
    //if user already exists throw err
    if(user)
    return res.status(400).json({
        status: "failed",
         message: "Please provide different email address",
         })
 

    //if user does not exist create new user
    user = await User.create(req.body);

    //creating token
    const token = newToken(user);

    //return user and token
    res.status(201).json({ user, token });

} catch(e){
    return res.status(500).json({status: "failed", message: e.message });
}
};



// router.post(
//     "/",
//     body("name").notEmpty().withMessage("Name is Required"),
//     body("email").notEmpty().withMessage("Email required").isEmail().withMessage("Email must be a valid email address."),

//     async (req, res) => {
//     const errors =validationResult(req);
//     if(!errors.isEmpty()) {
//         let newErrors = errors.array().map(({ msg, param, location }) => {
//             return {
//                 [param]:msg,
//             };
//         });
//         return res.status(400).json({ errors: newErrors });
//     }
//     try {
//       const user = await User.create(req.body);
  
//       return res.status(201).send(user);
//     } catch (e) {
//       return res.status(500).json({ message: e.message, status: "Failed" });
//     }
//   });

const router = async (req, res) => {
    try{
        const users = await User.find().lean().exec();
        return res.status(201).send({users});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
}

// router.get("/:id", async (req, res) => {
//     try{
//         const user = await User.findById(req.params.id).lean().exec();
//         return res.status(201).send(user);
//     }catch(e){
//         return res.status(500).json({message: e.message, status: "Failed"});
//     }
// });

// router.patch("/:id", async (req, res) => {
//     try{
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//           new: true,  
//         }).lean().exec();
//         return res.status(201).send(user);
//     }catch(e){
//         return res.status(500).json({message: e.message, status: "Failed"});
//     }
// });

// router.delete("/:id", async (req, res) => {
//     try{
//         const user = await User.findByIdAndDelete(req.params.id).lean().exec();
//         return res.status(201).send(user);
//     }catch(e){
//         return res.status(500).json({message: e.message, status: "Failed"});
//     }
// });

// module.exports = router;

const login = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});

        //if user doesn't exist throw err
        if(!user)
        return res.status(400).json({
            status: "failed",
            message: "Please provide valid email"
        });

        //matching password in user model
        const match = await user.checkPassword(req.body.password);
        
        //if password is not a match throw err
        if(!match)
        return res.status(400).json({
            status: "failed",
            message: "Please provide correct email and password"
        });
       
        //if password matches create token
        const token = newToken(user);
     
        res.status(201).json({ user,token });
    }
    catch(e){
        return res.status(500).json({ status:"failed", message: e.message });
    }
};

module.exports = {register, login, router}
