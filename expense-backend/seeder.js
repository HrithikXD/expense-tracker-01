import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import expense from "./data/expense.js";
import User from "./models/userModel.js";
import Expenses from "./models/expenseModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () =>{
    try {
        await Expenses.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const User1 = createdUsers[0]._id;

        const sampleExpenses = expense.map((element) => {
            return {...element, user : User1}
        });

        await Expenses.insertMany(sampleExpenses);

        console.log('Data Imported!'.green.inverse);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Expenses.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed!'.green.inverse);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
} else {
    importData();
}

