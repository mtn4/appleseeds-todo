import { Project } from "../models/project/project.model.js";

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const updateProject = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "goal"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates!" });
  }
  try {
    const project = await Project.findById(req.params.id);
    updates.forEach((update) => (project[update] = req.body[update]));
    await project.save();
    res.send(project);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    await project.remove();
    res.send();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const addTask = async (req, res) => {
  const { name, urgency, comments, status } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const task = {
      name,
      urgency,
      comments,
      status,
    };
    project.tasks.push(task);
    await project.save();
    res.send(project);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.pid);
    const task = project.tasks.find((task) => task._id.equals(req.params.tid));
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.json(task);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project.tasks);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "urgency", "comments", "status"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates!" });
  }
  try {
    const project = await Project.findById(req.params.pid);
    const index = project.tasks.findIndex((task) =>
      task._id.equals(req.params.tid)
    );
    if (index === -1) {
      return res.status(404).send({ message: "Task not found" });
    }
    updates.forEach(
      (update) => (project.tasks[index][update] = req.body[update])
    );
    await project.save();
    res.send(project);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.pid);
    const index = project.tasks.findIndex((task) =>
      task._id.equals(req.params.tid)
    );
    if (index === -1) {
      return res.status(404).send({ message: "Task not found" });
    }
    project.tasks.splice(index, 1);
    await project.save();
    res.send();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
