import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import express from 'express'


// initialized the app and port
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());

app.use(express.json());