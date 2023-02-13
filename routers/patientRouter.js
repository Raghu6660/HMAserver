import express from 'express';
import { authController } from '../controllers/authController.js';
import {patientController} from '../controllers/patientController.js';
const router = express.Router();

// router.post('/patient', authController.patientLoginPost);

router.get('/admin/profile/patient',patientController.patientfetch);

export default router;