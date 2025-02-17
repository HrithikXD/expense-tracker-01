import express from 'express';
import { getExpenses, deleteExpenseById, getExpenseById, addExpense, updateExpense } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getExpenses).post(protect, addExpense)
router.route('/:id').get(protect, getExpenseById).put(protect, updateExpense)
router.route('/:id').delete(protect, deleteExpenseById)
 

export default router;