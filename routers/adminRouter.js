import express from 'express';
import { authController } from '../controllers/authController.js';
import {adminController} from '../controllers/adminController.js';
const router = express.Router();

// router.post('/admin', authController.adminLoginPost);

// router.post('/admin/signup', authController.adminSignupPost);


router.get('/admin/profile', adminController.adminfetch);

export default router;