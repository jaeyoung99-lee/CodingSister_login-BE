const express = require("express");
const router = express.Router();
const taskAPI = require("./task.api");

router.use("/tasks", taskAPI);

module.exports = router;
