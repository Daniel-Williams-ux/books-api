import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import {
    createBook,
    getBooks,
    getBook,
    updateBook,
    updateBookCover,
    deleteBook
  } from '../controllers/bookController';

const router: Router = Router();

// Validation rules
const bookValidationRules = [
    check('title').notEmpty().withMessage('Title is required'),
    check('author').notEmpty().withMessage('Author is required'),
    check('publishedDate').isISO8601().toDate().withMessage('Published Date must be a valid date'),
    check('isbn').isISBN().withMessage('ISBN must be valid')
  ];
  
  // Middleware to handle validation errors
  const validate = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
  
// Define routes with appropriate request handlers and TypeScript types
router.post('/', (req: Request, res: Response) => createBook(req, res));
router.get('/', (req: Request, res: Response) => getBooks(req, res));
router.get('/:id', (req: Request, res: Response) => getBook(req, res));
router.put('/:id', (req: Request, res: Response) => updateBook(req, res));
router.patch('/cover-image/:id', (req: Request, res: Response) => updateBookCover(req, res));
router.delete('/:id', (req: Request, res: Response) => deleteBook(req, res));

export default router;