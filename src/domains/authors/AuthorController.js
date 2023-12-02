import { Author } from "../../models/author.js";
import { Book } from "../../models/book.js";

class AuthorController {
  static async all(_req, res) {
    const authors = await Author.find({});
    return res.status(200).json(authors);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).end();
    }

    const books = await Book.find({ author: id });
    author.books = books;

    return res.status(200).json(author);
  }

  static async create(req, res) {
    const author = new Author(req.body);
    await author.save();
    return res.status(201).json(author);
  }

  static async update(req, res) {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    author.set(req.body);
    await author.save();

    return res.status(200).json(author);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const author = await Author.findByIdAndDelete(id);
    author ? res.status(204).end() : res.status(404).end();
  }
}

export default AuthorController;
