const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, default: null },
    description: { type: String, default: null },
    status: { type: String, default: null },
    createdAt: { type: Number, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
