import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from '../src/routes/bookRoutes'; // Adjust path as necessary
import BookModel from '../src/models/bookModel';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes);

// Use the connection URI from the .env file
const mongoUri = process.env.MONGODB_URL || '';

beforeAll(async () => {
  if (!mongoUri) {
    throw new Error('MONGODB_URL is not defined in .env file');
  }

  await mongoose.connect(mongoUri);
}, 30000);

beforeEach(async () => {
  await BookModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
}, 30000);

describe('Book API Endpoints', () => {
  it('should create a new book', async () => {
    const response = await request(app)
      .post('/api/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        publishedDate: '2024-01-01',
        isbn: '1234567890123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('Test Book');
  });

  it('should get all books', async () => {
    await BookModel.create({
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2024-01-01',
      isbn: '1234567890123',
    });

    const response = await request(app).get('/api/books');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].title).toBe('Test Book');
  });

  it('should get a book by ID', async () => {
    const book = await BookModel.create({
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2024-01-01',
      isbn: '1234567890123',
    });

    const response = await request(app).get(`/api/books/${book._id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Book');
  });

  it('should update a book', async () => {
    const book = await BookModel.create({
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2024-01-01',
      isbn: '1234567890123',
    });

    const response = await request(app)
      .put(`/api/books/${book._id}`)
      .send({
        title: 'Updated Book Title',
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Book Title');
  });

  it('should delete a book', async () => {
    const book = await BookModel.create({
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2024-01-01',
      isbn: '1234567890123',
    });

    const response = await request(app).delete(`/api/books/${book._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Book deleted successfully');
  });
});