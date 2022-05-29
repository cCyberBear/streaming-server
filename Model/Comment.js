const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
