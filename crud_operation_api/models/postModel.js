const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title can't be empty"],
    },
    body: {
      type: String,
      required: [true, "Body can't be empty"],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
