import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import bookRoutes from './routes/bookRoutes';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Routes
app.use('/api/books', bookRoutes);

// Verify MongoDB URI from environment variables
const mongoDBUri = process.env.MONGODB_URL;
if (!mongoDBUri) {
    console.error('MONGODB_URL environment variable is not set.');
    process.exit(1);  // Exit the application with an error code
}
console.log('MongoDB URL:', mongoDBUri);

  // MongoDB connection
mongoose.connect(mongoDBUri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });