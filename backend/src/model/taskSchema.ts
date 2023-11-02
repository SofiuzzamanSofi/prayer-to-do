import mongoose from "mongoose";

// create a schema
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        state: {
            type: [String], // Use [String] to define an array of strings
            required: true,
            enum: ["todo", "in-progress", "done"],
        }
    },
    {
        timestamps: true,
    },
);

// create a model
export const TaskModel = mongoose.model("Task", taskSchema);