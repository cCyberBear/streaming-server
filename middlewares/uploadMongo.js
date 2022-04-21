const multer = require("multer");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");

const fileFilter = (req, file, cb) => {
  //check extension trc khi upload
  const allowed = [".jpg", ".png", ".gif", ".jpeg", ".mp4"];
  const fileExtension = path.extname(file.originalname);
  const regex = new RegExp(`(${allowed.join("|")})$`, "i");

  if (regex.test(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error("file extension is noy allow"), false);
  }
};

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`;
      const fileInfo = { filename, bucketName: process.env.BUCKET_NAME };
      resolve(fileInfo);
    });
  },
});

const mongoUpload = multer({ storage, fileFilter });
module.exports = mongoUpload;
