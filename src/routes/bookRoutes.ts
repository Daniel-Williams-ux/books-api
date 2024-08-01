import { Router, Request, Response } from 'express';
import multer from 'multer';
import { check, validationResult } from 'express-validator';
import {
    createBook,
    getBooks,
    getBook,
    updateBook,
    updateBookCover,
    deleteBook
} from '../controllers/bookController';

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Validation rules for book creation
const bookValidationRules = [
    check('title').notEmpty().withMessage('Title is required'),
    check('author').notEmpty().withMessage('Author is required'),
    check('publishedDate').isISO8601().toDate().withMessage('Published Date must be a valid date'),
    check('isbn').isLength({ min: 10, max: 13 }).withMessage('ISBN must be between 10 and 13 characters long')
];

// Middleware to handle validation errors
const validate = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const router: Router = Router();

// Define routes with validation middleware and file upload where needed
router.post('/', bookValidationRules, validate, (req: Request, res: Response) => createBook(req, res));
router.get('/', (req: Request, res: Response) => getBooks(req, res));
router.get('/:id', (req: Request, res: Response) => getBook(req, res));
router.put('/:id', (req: Request, res: Response) => updateBook(req, res));

// Update the book cover image with file upload handling
router.patch('/cover-image/:id', upload.single('coverImage'), (req: Request, res: Response) => updateBookCover(req, res));

router.delete('/:id', (req: Request, res: Response) => deleteBook(req, res));

export default router;