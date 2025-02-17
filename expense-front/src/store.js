import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import expensesSliceReducer from './slices/expensesSlice'
import authSliceReducer from './slices/authSlice'

const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        expenses : expensesSliceReducer,
        auth : authSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true //for dev env
})



export default store