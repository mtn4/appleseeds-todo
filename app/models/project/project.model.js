import mongoose from "mongoose";
import { projectSchema } from "./project.schema.js";

const Project = mongoose.model("Project", projectSchema);

export { Project };
