import { Book } from "../../models/book.js"

class BooksController {
  static async getAll(_req, res) {
    const books = await Book.find();
    res.status(200).json(books);
  }

  static async getById(req, res) {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  }

  static async create(req, res) {
    try {
      const book = new Book(req.body);
      await book.save();

      res.status(201).json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      book.set(req.body);
      await book.save();

      res.status(200).json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      book.deleteOne();

      res.status(204).json({});
    } catch(err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default BooksController;
