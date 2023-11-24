import { Book } from "../../models/book.js"

class BooksController {
  static async getAll(_req, res) {
    const books = await Book.find();
    res.json(books);
  }

  static async getById(req, res) {
    // TODO: Implement code to get a book by its ID from the database
  }

  static async create(req, res) {
    // TODO: Implement code to create a new book in the database
  }

  static async update(req, res) {
    // TODO: Implement code to update a book in the database
  }

  static async delete(req, res) {
    // TODO: Implement code to delete a book from the database
  }
}

export default BooksController;
