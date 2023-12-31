const express = require("express");
const {
  getAllUsers,
  registerController,
  LoginController,
} = require("../controller/userController");

//router object
const router = express.Router();

router.get("/all-users", getAllUsers);

//create user || post
router.post("/register", registerController);

//login || post
router.post("/login", LoginController);

module.exports = router;
