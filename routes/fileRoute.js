const express = require("express");
const router = express.Router();
const FILE = require("../controllers/fileController");
const mongoUpload = require("../middlewares/uploadMongo");

router.post("/upload", mongoUpload.single("video"), FILE.createFile);
router.get("/get-all-video", FILE.getAllFile);

module.exports = router;
