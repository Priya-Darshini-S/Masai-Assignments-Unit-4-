const express = require("express");

const Post = require("../models/post.model");

const crudController = require("./crud.controller");

const router = express.Router();

// /posts "/:id" get
router.post("", crudController.post(Post));

router.get(
  "",
  crudController.getAllWithTwoPopulate(
    Post,
    { path: "user_id", select: "first_name" },
    { path: "tag_ids" }
  )
);

// router.get("", async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate({ path: "user_id", select: "first_name" })
//       .populate("tag_ids")
//       .lean()
//       .exec();

//     return res.send(posts);
//   } catch (e) {
//     return res.status(500).json({ message: e.message, status: "Failed" });
//   }
// });

router.get("/:id", crudController.getOne(Post));

router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.send(post);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id).lean().exec();

    return res.send(post);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
