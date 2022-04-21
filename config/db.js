const mongoose = require("mongoose");

class Mongo {
  constructor() {
    this.gridfs = null;
  }
  static conect = () => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("Conect successfully");
      })
      .catch((err) => {
        console.log(err);
        console.log("Connection fail");
      });
    const conn = mongoose.connection;
    conn.once("open", () => {
      this.gridfs = new mongoose.mongo.GridFSBucket(conn.db, {
        chunkSizeBytes: 10 ** 6,
        bucketName: process.env.BUCKET_NAME,
      });
    });
  };
}
module.exports = Mongo;
