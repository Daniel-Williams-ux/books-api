import mongoose, { Document, Schema } from 'mongoose';
import { Book } from '../types/book';

// Extend mongoose Document interface to include our Book type
interface BookDocument extends Document, Book {}

const bookSchema: Schema = new Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  author: { type: String, required: [true, 'Author is required'], trim: true },
  publishedDate: { type: Date, required: [true, 'Published date is required'] },
  isbn: { type: String, required: [true, 'ISBN is required'], unique: true, trim: true },
  coverImage: { type: String, trim: true }
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

// Create and export the Book model
const BookModel = mongoose.model<BookDocument>('Book', bookSchema);
export default BookModel;