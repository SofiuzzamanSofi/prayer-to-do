import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import connectDb from "./utils/lib/mongodb";
import colors from 'colors';

// initialized the app and port
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//mongodb connect 
try {
    connectDb();
} catch (error) {
    console.log("Could not connect to Mongoose: ", error);
};

//routes

//home || testing route 
app.get("/", (req, res) => {
    res.status(200).send({
        success: true,
        message: "Welcome to the prayer-todo-server",
        data: "Dummy Data text",
    });
});

// if no route found 
app.all("*", (req, res) => {
    res.status(404).send("NO ROUTE FOUND.");
});

//global error handler

app.listen(port, () => {
    console.log(colors.bgCyan(`to-do server listening on port: ${port}`))
});