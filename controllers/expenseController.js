import expenceModel from "../models/expenseModel.js";

// get all expences
const allExpences = async (req, res) => {
    try {
        const expence = await expenceModel.find();
        res.send({
            count: expence.length,
            data: expence
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
};

// get one expence by id 
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const expence = await expenceModel.findById(id);
        res.send({
            expence
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
};


// create a new expence
const createExpence = async (req, res) => {
    try {
        const { amount, category, description } = req.body;
        // checking if required fields is same as model
        if (!req.body.amount || !req.body.category || !req.body.description) {
            return res.status(400).send({
                message: "Send all required fields : amount, category, description"
            });
        } // end if

        const newExpence = {
            amount: amount,
            category: category,
            description: description
        }

        const expence = await expenceModel.create(newExpence);
        return res.status(201).send(expence);


    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message })
    }
};


// update expence
const updateExpence = async (req, res) => {
    try {
        // checking if required fields is same as model
        if (!req.body.amount || !req.body.category || !req.body.description) {
            return res.status(400).send({
                message: "Send all required fields : amount, category, description"
            });
        } // end if

        const { id } = req.params;
        const result = await expenceModel.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).send({
                message: "Expence not found"
            });
        } else {
            return res.status(200).send({
                message: "Expence updated successfully..."
            });
        }


    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message })
    }
};


// delete expence
const deleteExpence = async (req, res) => {
    try {

        const { id } = req.params;
        const result = await expenceModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({
                message: "Exoence not found"
            });
        } else {
            return res.status(200).send({
                message: "Expence deleted successfully..."
            });
        }


    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message })
    }
};


// Get monthly expense report
const monthlyExpenseReport = async (req, res) => {
    try {
        const allExpenses = await expenceModel.find();

        // The keys will be strings like "January 2024" and the values will be totals and counts for that month.
        const grouped = {};

        allExpenses.forEach(exp => {
            // Converts the string date from the database into a real JavaScript Date object so we can extract month/year from it.
            const date = new Date(exp.date);
            // "January 2024"
            const key = date.toLocaleString('default', { month: 'long', year: 'numeric' });

            if (!grouped[key]) {
                // totalAmount = 0 → for adding amounts.
                // count = 0 → to count how many expenses happened in this month.
                grouped[key] = { totalAmount: 0, count: 0 };
            }

            grouped[key].totalAmount += exp.amount;
            grouped[key].count += 1;
        });

        const result = Object.entries(grouped).map(([month, data]) => ({
            month,
            totalAmount: data.totalAmount,
            count: data.count
        }));

        /* It loops over all expenses.
        
        Groups them by "Month Year".
        
        Sums their amounts.
        
        Counts how many entries per month.
        
        Returns a clean array of reports. */

        res.status(200).send({ data: result });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


export const expenceController = { allExpences, getById, createExpence, updateExpence, deleteExpence, monthlyExpenseReport };