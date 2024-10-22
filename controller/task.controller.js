const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const { userId } = req;
    const newTask = new Task({ task, isComplete, author: userId });
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).populate("author");
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      id,
      { isComplete },
      { new: true }
    );
    if (!updateTask) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not found" });
    }
    res.status(200).json({ status: "ok", data: updateTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Task.findByIdAndDelete(id);
    if (!deleteTask) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not found" });
    }
    res
      .status(200)
      .json({ status: "ok", message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = taskController;
