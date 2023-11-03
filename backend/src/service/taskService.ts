import express from "express";
import { TaskModel } from "../model/taskSchema";
import { TaskTypes } from "../typesInterface/typesInterface";

// get all task 
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

// add a task
export const addTaskService = async (
    next: express.NextFunction,
    handleTaskData: TaskTypes
) => {
    try {
        const tasks = await new TaskModel(handleTaskData).save();
        return tasks;
    } catch (error) {
        next(error);
    }
};

// edit a task
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