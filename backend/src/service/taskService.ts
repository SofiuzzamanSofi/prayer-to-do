import express from "express";
import { TaskModel } from "../model/taskSchema";
import { TaskTypes } from "../typesInterface/typesInterface";

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

export const editTaskService = async (
    next: express.NextFunction,
    handleTaskData: TaskTypes
) => {
    try {
        const tasks = await TaskModel.findByIdAndUpdate(
            handleTaskData._id,
            {
                handleTaskData
            },
            {
                new: true
            }
        );
        return tasks;
    } catch (error) {
        next(error);
    }
};