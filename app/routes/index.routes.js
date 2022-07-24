import { Router } from "express";

import { projectRouter } from "./project.routes.js";
import { taskRouter } from "./task.routes.js";
import { subtaskRouter } from "./subtask.routes.js";

const indexRoute = Router();

indexRoute.use("/projects", projectRouter);
indexRoute.use("/tasks", taskRouter);
indexRoute.use("/subtasks", subtaskRouter);

export { indexRoute };
