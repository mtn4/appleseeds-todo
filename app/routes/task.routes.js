import express from "express";

import {
  addTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";

const taskRouter = express.Router();

taskRouter.post("/:id", addTask);
taskRouter.get("/all/:id", getTasks);
taskRouter.get("/:id", getTask);
taskRouter.patch("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export { taskRouter };
