import express from "express";
import { expenceController } from "../controllers/expenseController.js";

const router = express.Router();


router.get("/expences", expenceController.allExpences);
router.get("/expence/:id", expenceController.getById);
router.post("/expences", expenceController.createExpence);
router.put("/expence/:id", expenceController.updateExpence);
router.delete("/expence/:id", expenceController.deleteExpence);
router.get("/monthly_expense_report", expenceController.monthlyExpenseReport);


export default router;
