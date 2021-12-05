const express = require("express");
const Gallery = require("../models/gallery.model");
const upload = require("../middleware/upload");
const router = express.Router();


router.post("/", upload.any("profileImage"), async (req, res) => {
  const filePaths = req.files.map((file) => file.path);
    try{
        const gallery =await Gallery.create({
            gallery_imgs_url: filePaths,
            user_id: req.body.user_id
        });
        return res.status(201).json({gallery});
    }catch(e){
        return res.status(500).json({ status:"failed", message: e.message});
    }
});


router.get("/", async (req, res) => {
    try{
        const gallery = await Gallery.find().lean().exec();
        return res.status(201).send({gallery});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});


router.patch("/:id", async (req, res) => {
    try{
        const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(gallery);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const gallery = await Gallery.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(gallery);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});



module.exports = router;