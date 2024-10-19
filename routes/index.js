const express = require("express");
const router = express.Router();
const taskAPI = require("./task.api");
const userAPI = require("./user.api");

router.use("/tasks", taskAPI);
router.use("/user", userAPI);

module.exports = router;
