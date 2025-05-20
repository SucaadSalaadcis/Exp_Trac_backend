import mongoose from 'mongoose';

const expenseSchema =  mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        default: '',
    },
}, { timestamps: true });

const expenceModel = mongoose.model('expense', expenseSchema);
export default expenceModel;
