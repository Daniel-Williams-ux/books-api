# Books API

A RESTful API for managing a collection of books, built with Node.js, Express, and MongoDB. This project demonstrates the implementation of CRUD operations and includes comprehensive tests.

## Table of Contents
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB Atlas account (or a local MongoDB instance)

### Environment Variables

Create a `.env` file in the root directory of the project with the following content:

```plaintext
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

### Project Setu
- git clone https://github.com/your-username/books-api.git
- cd books-api
- npm install
- npm run dev

The API will be available at http://localhost:3000.

API Endpoints
Books
Create a Book

POST /api/books
Request Body:
json
{
  "title": "Book Title",
  "author": "Author Name",
  "publishedDate": "2022-01-01",
  "genre": "Genre",
  "summary": "Book summary"
}
Get All Books

GET /api/books
Get a Book by ID

GET /api/books/:id
Update a Book

PUT /api/books/:id
Request Body (partial or full update):
json
{
  "title": "Updated Title",
  "author": "Updated Author"
}
Delete a Book

DELETE /api/books/:id
Users
Register a User

POST /api/register
Request Body:
json
{
  "username": "your_username",
  "password": "your_password"
}
Login a User

POST /api/login
Request Body:
json
{
  "username": "your_username",
  "password": "your_password"
}
Testing
To run the tests, use:

sh
npm test
This project uses Jest for testing. The tests cover all API endpoints to ensure they work as expected.

Sample Test File
Here is a sample test file located at tests/bookController.test.ts:

typescript
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';

const mongoUri = process.env.MONGODB_URI;

beforeAll(async () => {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in .env file');
  }
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Book API Endpoints', () => {
  let bookId: string;

  it('should create a new book', async () => {
    const res = await request(app).post('/api/books').send({
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2024-01-01',
      genre: 'Fiction',
      summary: 'A test book summary',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    bookId = res.body._id;
  });

  it('should get all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a book by ID', async () => {
    const res = await request(app).get(`/api/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', bookId);
  });

  it('should update a book', async () => {
    const res = await request(app).put(`/api/books/${bookId}`).send({
      title: 'Updated Test Book',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Book');
  });

  it('should delete a book', async () => {
    const res = await request(app).delete(`/api/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', bookId);
  });
});
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

License
This project is licensed under the MIT License.
