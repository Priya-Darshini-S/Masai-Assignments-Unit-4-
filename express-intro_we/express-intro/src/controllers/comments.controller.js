const express = require("express");

const Comment = require("../models/comment.model");

const crudController = require("./crud.controller");

const router = express.Router();

router.post("", crudController.post(Comment));
router.get("", crudController.getAll(Comment));
router.get("/:id", crudController.getOne(Comment));

router.patch("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.send(comment);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.send(comment);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
