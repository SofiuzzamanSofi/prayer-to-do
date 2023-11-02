import express from "express";
import { editTaskService, getAllTaskService } from "../service/taskService";

// get all tasks 
export const getAllTaskController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    console.log("hitted. all tasks");
    try {
        const getTaskData = await getAllTaskService(next);
        if (!getTaskData) {
            return res.status(200).json({
                success: false,
                message: `Job data not found.`,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Successfully got all jobs.",
                data: getTaskData,
            });
        };
    } catch (error) {
        next(error);
    };
};

// edit all tasks 
export const editTaskController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const { handleTaskData } = req?.body;
    console.log("hitted. all tasks");
    if (!handleTaskData) {
        return res.status(400).json({
            success: false,
            message: "Task Data is missing",
        });
    }
    try {
        const getTaskData = await editTaskService(next, handleTaskData);
        if (!getTaskData) {
            return res.status(200).json({
                success: false,
                message: `Job data not found.`,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Successfully got all jobs.",
                data: getTaskData,
            });
        };
    } catch (error) {
        next(error);
    };
};