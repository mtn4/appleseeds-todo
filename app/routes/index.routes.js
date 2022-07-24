import { Router } from "express";

import { projectRouter } from "./project.routes.js";

const indexRoute = Router();

indexRoute.use("/projects", projectRouter);

export { indexRoute };
