const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateExpense = (state) => {
    
            //Present month
            // state.expenseMonth = state.expenseItems.filter(item =>  new Date(item.createdAt).getMonth() === new Date().getMonth() && new Date(item.createdAt).getFullYear() === new Date().getFullYear());

            //Calculate total month amount
            state.expensePrice = addDecimals(state.expenseItems.reduce((acc, item) => parseFloat(acc) + parseFloat(item.amount), 0)); 

            localStorage.setItem("expenses", JSON.stringify(state))
}