import express from "express";

import {
  addSubTask,
  getSubTask,
  getSubTasks,
  updateSubTask,
  deleteSubTask,
} from "../controllers/subtask.controllers.js";

const subtaskRouter = express.Router();

subtaskRouter.post("/:id", addSubTask);
subtaskRouter.get("/all/:id", getSubTasks);
subtaskRouter.get("/:id", getSubTask);
subtaskRouter.patch("/:id", updateSubTask);
subtaskRouter.delete("/:id", deleteSubTask);

export { subtaskRouter };
