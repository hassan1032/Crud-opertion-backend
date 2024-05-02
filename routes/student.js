import express from "express";

import {Student} from '../models/Student.js'

import bcrypt from "bcrypt";
const router = express.Router();
import {verifyAdmin} from './auth.js'
router.post("/register",verifyAdmin, async (req, res) => {
    try{
        const {username, roll, password,grade} = req.body;
        const student = await Student.findOne({username});
        if(student){
            return res.status(400).json({message: `Student Already Exists`});
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newStudent = new Student({
            username,
            roll,
            password: hashedPassword,
            grade
        });
        await newStudent.save();
        res.status(200).json({message: `Student Registered Successfully`,data:newStudent});


    }catch(err){
        res.status(500).json({message: `Error In Registering Student`});

    }

})
export {router as studentRouter}