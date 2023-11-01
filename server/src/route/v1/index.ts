import express from "express";
import createTasksControllerRoute from "./tasks";

const route = express.Router();

export default (): express.Router => {

    createTasksControllerRoute(route);
    return route;
};