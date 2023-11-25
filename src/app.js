import express from "express";
import bookRoutes from "./domains/books/index.js";
import homeRoutes from "./domains/home/index.js";
import connectDB from "./infra/mongodb.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
if (process.env.ENV === "development") {
  connectDB();
}

// config routes
app.use(express.json());
app.use("/", homeRoutes);
app.use("/books", bookRoutes);

export default app;
