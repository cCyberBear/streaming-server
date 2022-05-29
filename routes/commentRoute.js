const router = require("express").Router();
const COMMENT = require("../controllers/commentController");

router.post("/send-comment", COMMENT.sendComment);
router.get("/get-comment/:videoId", COMMENT.getComment);

module.exports = router;
