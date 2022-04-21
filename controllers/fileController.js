const catchAsync = require("../middlewares/async");
const File = require("../Model/File");
exports.createFile = catchAsync(async (req, res) => {
  const { name, description } = req.body;
  const file = await File.create({
    name,
    description,
    video: req.file.filename,
  });
  if (!file) {
    res.status(400).json({
      success: false,
      data: "can not save",
    });
  }
  res.status(200).json({
    success: true,
  });
});

exports.getAllFile = catchAsync(async (req, res) => {
  const files = await File.find({});
  res.status(400).json({
    success: false,
    data: files,
  });
});
