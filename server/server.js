import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './config/mongoose.config.js';
import cookieParser from 'cookie-parser';
import gameRouter from './routes/games.routes.js';
import userRouter from './routes/users.routes.js';

dotenv.config(); // Load environment variables

const app = express();

// Middleware setup
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/api/user', userRouter);
app.use('/api/games', gameRouter);

dotenv.config()
const PORT = process.env.PORT
dbConnect();

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    err.name = "Not Found";
    next(err);
});

//error normalization
app.use((err, req, res, next) => {
    console.log(err.statusCode);
    err.name === "ValidationError" ? err.statusCode = 400 : "";
    // Normalize the error
    const normalizedError = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went wrong',
        name: err.name || 'Server Error',
        validationErrors: extractValidationErrors(err)
    };
    // Return the normalized error
    res.status(normalizedError.statusCode).json(normalizedError);
});

const extractValidationErrors = err => {
    const validationErrors = {};
    if (err.name === 'ValidationError') {
        for (const field in err.errors) {
            console.log(field)
            if (err.errors.hasOwnProperty(field)) {
                const errorMessage = err.errors[field].message;
                validationErrors[field] = errorMessage;
            }
        }
    }
    return validationErrors
}

//at very end of server.js file
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))