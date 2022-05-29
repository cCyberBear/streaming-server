const express = require("express");
const router = express.Router();
const USER = require("../controllers/userController");
const { jwtAuth } = require("../middlewares/jwtAuth");

router.post("/register", USER.register);
router.post("/login", USER.login);
router.get("/me", USER.me);
router.get("/all-user", USER.getAllUser);
router.patch("/change-password", jwtAuth, USER.changePassword);
router.patch("/user-shipment", jwtAuth, USER.userShipment);

module.exports = router;
