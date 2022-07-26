import { Task } from "../models/task/task.model.js";
import { Project } from "../models/project/project.model.js";

export const addTask = async (req, res) => {
  try {
    const { name, status } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const task = new Task({
      name,
      status,
      project: req.params.id,
    });
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    await task.populate("project");
    res.json(task);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const tasks = await Task.find({ project: req.params.id }).populate(
      "project"
    );
    res.json(tasks);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "status"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates!" });
  }
  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    await task.remove();
    res.send();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
