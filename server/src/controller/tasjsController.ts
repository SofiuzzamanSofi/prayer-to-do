import express from "express";
import { getAllTaskService } from "../service/taskService";

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

    }
};