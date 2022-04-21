const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
  },
  video: {
    type: String,
    required: [true, "Video is required"],
  },
});

module.exports = mongoose.model("File", FileSchema);
