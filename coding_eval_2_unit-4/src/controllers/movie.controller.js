const express = require("express");
const upload = require("../middleware/upload");
const Movie = require("../models/movie.model");
const authenticate = require("../middleware/authentication");
const router = express.Router();



router.post("/", upload.any("posterImage"), authenticate, async (req, res) => {
    const filePaths = req.files.map((file) => file.path);
    try {
        const user = require.user;
      const movie = await Movie.create({
        name: req.body.name,
        actors: [req.body.actors],
        languages: [req.body.languages],
        directors: [req.body.directors],
        poster_url: filePaths,
        user: user.user._id
      });
  
      return res.status(201).json({movie});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

router.get("/", async (req, res) => {
    try{
        const movies = await Movie.find().lean().exec();
        return res.status(201).send({movies});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

router.get("/:id", async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id).lean().exec();
        return res.status(201).send(movie);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.patch("/:id", async (req, res) => {
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(movie);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(movie);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

module.exports = router;

