import { Subtask } from "../models/subtask/subtask.model.js";
import { Task } from "../models/task/task.model.js";

export const addSubTask = async (req, res) => {
  try {
    const { name, description, comments, urgency, status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    const subtask = new Subtask({
      name,
      description,
      comments,
      urgency,
      status,
      task: req.params.id,
    });
    await subtask.save();
    res.send(subtask);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getSubTask = async (req, res) => {
  try {
    const subtask = await Subtask.findById(req.params.id);
    res.json(subtask);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getSubTasks = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    const subtasks = await Subtask.find({ task: req.params.id });
    res.json(subtasks);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const updateSubTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "description",
    "comments",
    "urgency",
    "status",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates!" });
  }
  try {
    const subtask = await Subtask.findById(req.params.id);
    updates.forEach((update) => (subtask[update] = req.body[update]));
    await subtask.save();
    res.send(subtask);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const deleteSubTask = async (req, res) => {
  try {
    const subtask = await Subtask.findById(req.params.id);
    await subtask.remove();
    res.send();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
