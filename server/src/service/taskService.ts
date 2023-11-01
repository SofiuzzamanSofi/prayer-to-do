import express from "express";
import { TaskModel } from "../model/taskSchema";

export const getAllTaskService = async (
    next: express.NextFunction
) => {
    try {
        const tasks = await TaskModel.find();
        return tasks;
    } catch (error) {
        next(error);
    }
};