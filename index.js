require("dotenv").config();
const catchError = require("./middlewares/error");
const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const commentRouter = require("./routes/commentRoute");

const fileRouter = require("./routes/fileRoute");
const Mongo = require("./config/db");

Mongo.conect();
app.use(express.json());
app.use(cors());
app.use("/kd/api/v1/video", fileRouter);
app.use("/kd/api/v1/user", userRouter);
app.use("/kd/api/v1/comment", commentRouter);
app.get("/file/:filename", (req, res) => {
  const { filename } = req.params;
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  Mongo.gridfs.find({ filename }).toArray((err, files) => {
    if (!files || !files.length) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    const videoSize = files[0].length;
    const start = Number(range.replace(/\D/g, ""));
    const end = videoSize - 1;

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    Mongo.gridfs
      .openDownloadStreamByName(filename, {
        start,
        end: videoSize,
      })
      .pipe(res);
  });
});

app.use(catchError);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
