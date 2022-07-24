import express from "express";

import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  addMainTask,
  getMainTask,
  getMainTasks,
  updateTask,
  deleteTask,
  getProject,
  addSubTask,
  getSubTask,
  getSubTasks,
  updateSubTask,
  deleteSubTask,
} from "../controllers/project.controllers.js";

const projectRouter = express.Router();

projectRouter.post("/", createProject);
projectRouter.get("/all", getAllProjects);
projectRouter.get("/task", getSubTask);
projectRouter.get("/:id", getProject);
projectRouter.patch("/task", updateSubTask);
projectRouter.patch("/:id", updateProject);
projectRouter.delete("/task", deleteSubTask);
projectRouter.delete("/:id", deleteProject);
projectRouter.post("/:id/task", addMainTask);
projectRouter.post("/:pid/:tid/task", addSubTask);
projectRouter.get("/:pid/task/:tid", getMainTask);
projectRouter.get("/:id/task", getMainTasks);
projectRouter.get("/:pid/:tid/task", getSubTasks);
projectRouter.patch("/:pid/task/:tid", updateTask);
projectRouter.delete("/:pid/task/:tid", deleteTask);

export { projectRouter };
