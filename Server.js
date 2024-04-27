import express from "express";
import dotenv from "dotenv";
import {  connect } from './DB.js'

const app = express();
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`server is Running`);
});
