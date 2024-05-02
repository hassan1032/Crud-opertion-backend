import express from "express";

import { Book } from "../models/Book.js";

const router = express.Router();
import {verifyAdmin} from './auth.js'
router.post("/add",verifyAdmin, async (req, res) => {
    try{
        const {name, author, imageUrl } = req.body; 
        const newbook = new Book({
            name,
            author,
          imageUrl
        
        });
        await newbook.save();
        res.status(200).json({message: `Add Book Registered Successfully`,data:newbook});


    }catch(err){
        res.status(500).json({message: `Error In Adding Book`});

    }

})

router.get('/books',async (req,res)=>{
  try{
    const books = await Book.find({});
    res.status(200).json(books);

    
  }catch{
    res.status(500).json({message: `Error In Fetching Books`});
    
  }
})
export {router as bookRouter}