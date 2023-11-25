import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import faker from "faker";
import { Book } from "./models/book.js";
import app from "./app.js";

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

function factoryBook() {
  return new Book({
    title: faker.lorem.words(3),
    genre: faker.random.word(),
    publicationYear: faker.date.past().getFullYear(),
  });
}

export { app, factoryBook };
