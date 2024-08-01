import { Router, Request, Response } from 'express';
import { createBook, getBooks, getBook, updateBook, updateBookCover, deleteBook } from '../controllers/bookController';

const router: Router = Router();

// Define routes with appropriate request handlers and TypeScript types
router.post('/', (req: Request, res: Response) => createBook(req, res));
router.get('/', (req: Request, res: Response) => getBooks(req, res));
router.get('/:id', (req: Request, res: Response) => getBook(req, res));
router.put('/:id', (req: Request, res: Response) => updateBook(req, res));
router.patch('/cover-image/:id', (req: Request, res: Response) => updateBookCover(req, res));
router.delete('/:id', (req: Request, res: Response) => deleteBook(req, res));

export default router;