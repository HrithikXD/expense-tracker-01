import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    category: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    amount: {
        type : Number,
        required : true
    }
},{timestamps : true})

const Expenses = mongoose.model("Expenses", expenseSchema);
export default Expenses;