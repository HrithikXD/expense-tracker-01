import asyncHandler from "../middleware/asyncHandler.js"
import Expenses from "../models/expenseModel.js"
import jwt from 'jsonwebtoken'

//@desc Fetch all expenses
//@route GET /api/expenses
//@access Public for now

const getUser = (cook) => {
    const decoded = jwt.verify(cook, process.env.JWT_SECRET)
    return decoded.userId
}

const getExpenses = asyncHandler( async(req, res)=>{
    const user = getUser(req.cookies.jwt)
    const expenses = await Expenses.find({user})
    res.json(expenses);
})

//@desc Fetch one expense 
//@route GET /api/expenses/:id
//@access Private

const getExpenseById = asyncHandler( async(req, res)=>{
    const user = getUser(req.cookies.jwt)
    const expense = await Expenses.findOne({_id:req.params.id, user});
    if(expense){
       return res.json(expense);
    } else {
        res.status(404)
        throw new Error('Not Found')
    }
})

//@desc delete one expense 
//@route DELETE /api/expenses/delete/:id
//@access Private

const deleteExpenseById = asyncHandler( async(req, res)=>{
    const user = getUser(req.cookies.jwt)
    const expense = await Expenses.findOne({_id:req.params.id, user});
    if(expense){
        await Expenses.deleteOne({_id: expense._id})
        res.status(200).json({message: 'Expense Deleted'})
    } else {
        res.status(404)
        throw new Error('Not Found')
    };
})

const addExpense = asyncHandler( async(req, res)=>{
    const {category, description, amount} = req.body
    const user = getUser(req.cookies.jwt)
    const expense = new Expenses({
        category,
        description,
        amount,
        user
    })
    const createExpense = await expense.save()
    res.status(200).json(createExpense)
  });

const updateExpense = asyncHandler( async (req, res)=>{
    const user = getUser(req.cookies.jwt)
    const expense = await Expenses.findOne({_id:req.params.id, user});

    if(expense){
        expense.category = req.body.category || expense.category,
        expense.description = req.body.description || expense.description
        expense.amount = req.body.amount || expense.amount

        const updateExpense = await expense.save();
        res.status(200).json({
            expense
        })

    } else {
        res.status(400);
        throw new Error('User not found')
    }

})

export {getExpenses, getExpenseById, deleteExpenseById, addExpense, updateExpense}