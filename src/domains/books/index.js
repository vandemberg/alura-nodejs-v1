import { Router } from 'express';
import controller from './BooksController.js';

const router = Router();

// GET /livros
router.get('/', controller.getAll);

// GET /livros/:id
router.get('/:id', (req, res) => {
  // TODO: Retrieve a specific book by id
});

// POST /livros
router.post('/', (req, res) => {
  // TODO: Create a new book
});

// PUT /livros/:id
router.put('/:id', (req, res) => {
  // TODO: Update a specific book by id
});

// DELETE /livros/:id
router.delete('/:id', (req, res) => {
  // TODO: Delete a specific book by id
});

export default router;
