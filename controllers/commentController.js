const catchAsync = require("../middlewares/async");
const Comment = require("../Model/Comment");

exports.sendComment = catchAsync(async (req, res) => {
  const newComment = new Comment(req.body);
  const savedComment = await newComment.save();
  res.status(200).json(savedComment);
});
exports.getComment = catchAsync(async (req, res) => {
  const Comments = await Comment.find({
    videoId: req.params.videoId,
  }).populate("userId");
  res.status(200).json(Comments);
});
