import express from "express";
import { Project } from "../models/project/project.model.js";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  addTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
  getProject,
} from "../controllers/project.controllers.js";

const projectRouter = express.Router();

projectRouter.post("/", createProject);
projectRouter.get("/all", getAllProjects);
projectRouter.get("/:id", getProject);
projectRouter.patch("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);
projectRouter.post("/:id/task", addTask);
projectRouter.get("/:pid/task/:tid", getTask);
projectRouter.get("/:id/tasks", getTasks);
projectRouter.patch("/:pid/task/:tid", updateTask);
projectRouter.delete("/:pid/task/:tid", deleteTask);

export { projectRouter };
