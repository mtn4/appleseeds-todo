import express from "express";

import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getProject,
} from "../controllers/project.controllers.js";

const projectRouter = express.Router();

projectRouter.post("/", createProject);
projectRouter.get("/all", getAllProjects);
projectRouter.get("/:id", getProject);
projectRouter.patch("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);

export { projectRouter };
