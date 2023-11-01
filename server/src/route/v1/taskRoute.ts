import { getAllTaskController } from '../../controller/tasjsController';
import express from 'express';

export default (router: express.Router) => {

    router.get("/all-task", getAllTaskController) // get all tasks
};