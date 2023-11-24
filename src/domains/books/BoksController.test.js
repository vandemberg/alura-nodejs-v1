// FILEPATH: /src/domains/books/BooksController.test.js
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { mongo } from 'mongoose';
import app from '../../app.js';

let mongoServer = null;

beforeAll(async () => {
  await mongoose.connection.close();
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('BooksController', () => {
  test('getAll should return a list of books', async () => {
    const response = await request(app).get('/books');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // test('getById should return a book by id', async () => {
  //   const book = new Book({ title: 'Test Book', author: 'Test Author' });
  //   await book.save();

  //   const response = await request(app).get(`/books/${book.id}`);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.title).toBe(book.title);
  //   expect(response.body.author).toBe(book.author);
  // });

  // test('create should create a new book', async () => {
  //   const newBook = { title: 'New Test Book', author: 'New Test Author' };
  //   const response = await request(app).post('/books').send(newBook);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.title).toBe(newBook.title);
  //   expect(response.body.author).toBe(newBook.author);
  // });

  // test('update should update a book', async () => {
  //   const book = new Book({ title: 'Test Book', author: 'Test Author' });
  //   await book.save();

  //   const updatedData = { title: 'Updated Test Book', author: 'Updated Test Author' };
  //   const response = await request(app).put(`/books/${book.id}`).send(updatedData);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.title).toBe(updatedData.title);
  //   expect(response.body.author).toBe(updatedData.author);
  // });

  // test('delete should delete a book', async () => {
  //   const book = new Book({ title: 'Test Book', author: 'Test Author' });
  //   await book.save();

  //   const response = await request(app).delete(`/books/${book.id}`);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.message).toBe('Book deleted successfully');
  // });
});
