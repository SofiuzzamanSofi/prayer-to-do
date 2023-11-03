import express from 'express';
import { addTaskController, editTaskController, getAllTaskController } from '../../controller/tasjsController';

export default (router: express.Router) => {

    router.get("/all-task", getAllTaskController) // get all task
    router.post("/all-task", addTaskController) // post a task
    router.patch("/all-task", editTaskController) // update a task only update 
};