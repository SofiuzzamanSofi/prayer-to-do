import express from 'express';
import { getAllTaskController } from '../../controller/tasjsController';

export default (router: express.Router) => {

    router.get("/all-task", getAllTaskController) // get all tasks
};