// FILEPATH: /src/domains/books/BooksController.test.js
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { mongo } from 'mongoose';
import app from '../../app.js';
import { Book } from "../../models/book.js"
import faker from 'faker';

let mongoServer = null;


function factoryBook() {
  return new Book({
    title: faker.lorem.words(3),
    genre: faker.random.word(),
    publicationYear: faker.date.past().getFullYear(),
  });
}

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

  test('getById should return a book by id', async () => {
    const book = factoryBook();

    await book.save();

    const response = await request(app).get(`/books/${book.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(book.title);
    expect(response.body.publicationYear).toBe(book.publicationYear);
    expect(response.body.genre).toBe(book.genre);
  });

  test('create should create a new book', async () => {
    const newBook = factoryBook().toJSON();
    const response = await request(app).post('/books').send(newBook);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newBook.title);
    expect(response.body.publicationYear).toBe(newBook.publicationYear);
    expect(response.body.genre).toBe(newBook.genre);
  });

  test('update should update a book', async () => {
    const book = factoryBook();
    await book.save();

    const updatedData = { ...book.toObject(), title: 'Updated Test Book' };
    const response = await request(app).put(`/books/${book.id}`).send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.publicationYear).toBe(updatedData.publicationYear);
    expect(response.body.genre).toBe(updatedData.genre);
  });

  test('delete should delete a book', async () => {
    const book = factoryBook();
    await book.save();

    const response = await request(app).delete(`/books/${book.id}`);
    expect(response.body).toBe(null);
    expect(response.statusCode).toBe(204);
  });
});
