import { Request, Response } from 'express';
import BookModel from '../models/bookModel';
import { body, validationResult } from 'express-validator';

// Create a book
export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, author, publishedDate, isbn, coverImage } = req.body;
    const newBook = new BookModel({ title, author, publishedDate, isbn, coverImage });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get all books with pagination
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract pagination parameters from the query string
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    // Validate pagination parameters
    if (page < 1 || limit < 1) {
      res.status(400).json({ message: 'Page and limit must be positive integers.' });
      return;
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch paginated books
    const books = await BookModel.find()
      .skip(skip)
      .limit(limit);

    // Send the paginated response
    res.status(200).json(books);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get a single book by ID
export const getBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBook = await BookModel.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Update the book cover image
export const updateBookCover = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(req.params.id, { coverImage: req.file?.path }, { new: true });
    if (!updatedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};