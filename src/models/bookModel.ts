// src/models/bookModel.ts

import mongoose, { Document, Schema } from 'mongoose';
import { Book } from '../types/book';

// Extend mongoose Document interface to include our Book type
interface BookDocument extends Document, Book {}

const bookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  isbn: { type: String, required: true, unique: true },
  coverImage: { type: String }
});

// Create and export the Book model
const BookModel = mongoose.model<BookDocument>('Book', bookSchema);
export default BookModel;