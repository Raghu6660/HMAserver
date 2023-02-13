import express from 'express';
import { authController } from '../controllers/authController.js';
import {doctorController} from '../controllers/doctorController.js';
const router = express.Router();

// router.post('/doctor', authController.doctorLoginPost);


 router.get('/admin/profile/doctor', doctorController.doctorfetch);

export default router;