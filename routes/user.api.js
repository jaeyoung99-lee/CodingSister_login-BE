const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

// 1. 회원가입 endpoint
router.post("/", userController.createUser);

module.exports = router;
