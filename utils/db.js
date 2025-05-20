import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config(); // make sure to load env before using variables

const DbConnect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@expencetracker.qzdwen7.mongodb.net/Expence_Tracker?retryWrites=true&w=majority&appName=expenceTracker`);
        console.log("Database connected successfully...");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
    }
};

export default DbConnect;
