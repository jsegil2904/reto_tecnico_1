import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {router} from "./routes/auth"
import "./db/database"
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 4400;

//settings
app.listen(PORT)
//middleware
app.use(cors());
app.use(express.json());

// routes
app.use(router)

export default app;