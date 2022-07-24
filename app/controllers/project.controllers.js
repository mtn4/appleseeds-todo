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

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
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

export const addMainTask = async (req, res) => {
  const { name, status } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const task = {
      name,
      status,
    };
    project.tasks.push(task);
    await project.save();
    res.send(project);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const addSubTask = async (req, res) => {
  const { name, description, comments, urgency, status } = req.body;
  try {
    const project = await Project.findById(req.params.pid);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const task = project.tasks.find((task) => task._id.equals(req.params.tid));
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    const subTask = {
      name,
      description,
      comments,
      urgency,
      status,
    };
    task.subTasks.push(subTask);
    await project.save();
    res.send(project);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getMainTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.pid);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const task = project.tasks.find((task) => task._id.equals(req.params.tid));
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.json(task);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getSubTask = async (req, res) => {
  try {
    const project = await Project.findById(req.body.pid);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const task = project.tasks.find((task) => task._id.equals(req.body.tid));
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    const subTask = task.subTasks.find((subTask) =>
      subTask._id.equals(req.body.stid)
    );
    if (!subTask) {
      return res.status(404).send({ message: "Sub Task not found" });
    }
    res.json(subTask);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getMainTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project.tasks);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getSubTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.pid);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const task = project.tasks.find((task) => task._id.equals(req.params.tid));
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.json(task.subTasks);
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
    const project = await Project.findById(req.query.pid);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const task = project.tasks.find((task) => task._id.equals(req.query.tid));
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    const index = task.subTasks.findIndex((subTask) =>
      subTask._id.equals(req.query.stid)
    );
    if (index === -1) {
      return res.status(404).send({ message: "Sub Task not found" });
    }
    updates.forEach(
      (update) => (task.subTasks[index][update] = req.body[update])
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

export const deleteSubTask = async (req, res) => {
  try {
    const project = await Project.findById(req.body.pid);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    const task = project.tasks.find((task) => task._id.equals(req.body.tid));
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    const index = task.subTasks.findIndex((subTask) =>
      subTask._id.equals(req.body.stid)
    );
    if (index === -1) {
      return res.status(404).send({ message: "Sub Task not found" });
    }
    task.subTasks.splice(index, 1);
    await project.save();
    res.send();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
