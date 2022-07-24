import mongoose from "mongoose";
import { Task } from "../task/task.model.js";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    goal: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "project",
});

projectSchema.pre("remove", async function (next) {
  const project = this;
  const tasks = await Task.find({ project: project._id });
  for (let i = 0; i < tasks.length; i++) {
    await tasks[i].remove();
  }
  next();
});

export { projectSchema };
