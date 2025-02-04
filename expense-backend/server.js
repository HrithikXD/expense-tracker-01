import express from 'express';
import expenses from './data/expense.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send("API is running...");
});

app.get('/api/expenses', (req, res) => {
    res.json(expenses);
});

app.get('/api/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === parseInt(req.params.id));
    res.json(expense);
});

app.delete('/api/delete/:id', (req, res) => {
    expenses = expenses.filter((e) => e.id !== parseInt(req.params.id));
    res.send("Expense deleted");
});


app.listen(port, () => console.log(`Server is running on port ${port}`));