const mongoose = require("mongoose");

// Post Mongoose
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // users
      required: true,
    },
    tag_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag", // tags
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema); // posts collection
