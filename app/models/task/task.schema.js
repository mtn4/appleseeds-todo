import mongoose from "mongoose";
import { Subtask } from "../subtask/subtask.model.js";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre("remove", async function (next) {
  const task = this;
  await Subtask.deleteMany({ task: task._id });
  next();
});

export { taskSchema };
