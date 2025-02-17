import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import expenseRoutes from './routes/expenseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;

connectDB();

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Cookie parser middleware
app.use(cookieParser())


app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes)

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static(path.join(__dirname, '/expense-front/build')))

    //any route that is not api will be redirected to index.html
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'expense-front', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send("API is running...");
    });
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`));