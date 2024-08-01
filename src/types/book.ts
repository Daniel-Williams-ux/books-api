// src/types/book.ts

export interface Book {
    title: string;
    author: string;
    publishedDate: Date;
    isbn: string;
    coverImage?: string; // Optional field for cover image URL
  }
  
  export interface CreateBookRequest {
    title: string;
    author: string;
    publishedDate: string; // Use string for incoming date format, parse it into Date in controller
    isbn: string;
  }
  
  export interface UpdateBookRequest {
    title?: string;
    author?: string;
    publishedDate?: string;
    isbn?: string;
  }

  export interface DeleteBookRequest {
    id: string; // ID of the book to be deleted
  }
  
  export interface BookResponse {
    id: string;
    title: string;
    author: string;
    publishedDate: Date;
    isbn: string;
    coverImage?: string;
  }
  