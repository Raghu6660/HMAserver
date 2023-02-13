import express from 'express';
import { authController } from '../controllers/authController.js';
const router = express.Router();

router.get('/admin', authController.adminLoginGet);
router.post('/admin', authController.adminLoginPost);
router.get('/admin/signup', authController.adminSignupGet);
router.post('/admin/signup', authController.adminSignupPost);

router.get('/doctor', authController.doctorLoginGet);
router.post('/doctor', authController.doctorLoginPost);
router.get('/doctor/signup', authController.doctorSignupGet);
router.post('/doctor/signup', authController.doctorSignupPost);

router.get('/patient', authController.patientLoginGet);
router.post('/patient', authController.patientLoginPost);
router.get('/patient/signup', authController.patientSignupGet);
router.post('/patient/signup', authController.patientSignupPost);

router.get('/logout', authController.logout);


export default router;