import express from 'express';

import { authController } from '../controllers/auth.js';

const router = express.Router();

router.get('/users', authController.getuser);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.delete("/user/:id", authController.deleteuser);

export default router;
