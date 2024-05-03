import express from "express";

import { Book } from "../models/Book.js";

const router = express.Router();
import { verifyAdmin } from "./auth.js";
// router for adding new book
router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { name, author, imageUrl } = req.body;
    const newbook = new Book({
      name,
      author,
      imageUrl,
    });
    await newbook.save();
    res
      .status(200)
      .json({ message: `Add Book Registered Successfully`, data: newbook });
  } catch (err) {
    res.status(500).json({ message: `Error In Adding Book` });
  }
});
// router for fetching all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch {
    res.status(500).json({ message: `Error In Fetching Books` });
  }
});
// Router For Fetching Book By Id
router.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById({ _id: id });
    res.status(200).json(book);
  } catch (err) {
    return res.json({ message: `Error In Fetching Book` });
  }
});
// Router For Updated Book 
router.put("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndUpdate({_id:id},req.body)
     return res.json({updated : true, book})

   
  } catch (err) {
    return res.json({ message: `Error In Fetching Book` });
  }
});
// Router For Deleted Book 
router.delete("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete({_id: id});
    if (deleteBook) {
      return res
        .status(200)
        .send({ message: "Book deleted successfully", deleteBook });
    }
    throw new Error("Book not found");
  } catch {
    return res.status(500).send({ message: "Error deleting book" });
  }
});
export { router as bookRouter };
