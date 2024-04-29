import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";
import './DB.js'
import { AdminRouter } from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: ["*"],
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use('/auth', AdminRouter)
dotenv.config();


app.listen(process.env.PORT,() => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
