import { createSlice } from "@reduxjs/toolkit";
import { updateExpense } from "../utils/updateExpense";
// import { useGetExpensesQuery } from "./expensesApiSlice";

// const {data : expenses, isLoading, error} = useGetExpensesQuery()
const initialState = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : {expenseItems : []}

// const getCurMonth = () => {
//    return new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0')
// }


const expensesSlice = createSlice({
    name : "expenses",
    initialState,
    reducers: {
        // addToExpense: (state, action) => {
        //     const item = action.payload;
        //     state.expenseItems = [...state.expenseItems, item]
        //     return updateExpense(state)
        // },

        updateMonth: (state, action) => {
            const item = action.payload
            console.log(action.payload)
            state.expenseItems = state.expenseItems.filter(expense =>  new Date(expense.createdAt).getMonth() === new Date(item).getMonth() && new Date(expense.createdAt).getFullYear() === new Date(item).getFullYear());
            return updateExpense(state)
        },

        removeFromCart : (state, action) => {
            state.expenseItems = state.expenseItems.filter((x)=>x._id
        !== action.payload)
        }

    }
})

export const {addToExpense, updateMonth, removeFromCart} = expensesSlice.actions;

export default expensesSlice.reducer;