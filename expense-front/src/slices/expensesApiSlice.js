import { EXPENSES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const expensesApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=> ({
        getExpenses: builder.query({
            query: () => ({
                url: EXPENSES_URL,
            }),
            providesTags : ['Expenses'],
            keepUnusedDataFor: 5
        }),
        deleteExpense : builder.mutation ({
            query: (id) => ({
                url : `${EXPENSES_URL}/${id}`,
                method : 'DELETE'
            }),
            invalidatesTags : ['Expenses']
        }),
        addNewExpense : builder.mutation({
            query: (data) => ({
                url : EXPENSES_URL,
                method: 'POST',
                body:data
            }),
            invalidatesTags: ['Expenses'],
        }),
        updateExpense : builder.mutation({
            query : (data) => ({
                url : `${EXPENSES_URL}/${data.id}`,
                method : 'PUT',
                body : data
            }),
            invalidatesTags : ['Expenses'],
        })
    })
});

export const {useGetExpensesQuery, useDeleteExpenseMutation, useAddNewExpenseMutation, useUpdateExpenseMutation} = expensesApiSlice