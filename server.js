import express from 'express';
import dotevn from 'dotenv'
import DbConnect from './utils/db.js'
import authRouter from './routes/auth.js';
import cors from 'cors'
import expenceRouter from './routes/expenseRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// enables JSON body parsing
app.use(express.json());
// env
dotevn.config();
// db connect
DbConnect();
// Access-Control
const allowedOrigins = [
    'http://localhost:5173',
    'https://expence-tracker-frontend-beta.vercel.app/'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Root route that returns a welcome message
app.get("/", (req, res) => res.status(200).send("Welcome to personal code testing"));


app.use(authRouter);
app.use(expenceRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

