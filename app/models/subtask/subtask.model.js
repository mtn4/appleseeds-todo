import mongoose from "mongoose";
import { subtaskSchema } from "./subtask.schema.js";

const Subtask = mongoose.model("Subtask", subtaskSchema);

export { Subtask };
