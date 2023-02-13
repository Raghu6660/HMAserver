import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import { requireAuth, checkuser } from "./middleware/authMW.js";

import { authController } from "./controllers/authController.js";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

import  authRouter  from './routers/authRouter.js'
import doctorRouter from './routers/doctorRouter.js'
import patientRouter from './routers/patientRouter.js'
import adminRouter from './routers/adminRouter.js'

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "100kb", extended: true }));
app.use(bodyParser.json({ limit: "100kb", extended: true }));
app.use(cors());
app.use(cookieParser());



const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: Storage })

// ROUTES WITH FILES
app.post("/admin/signup", upload.single("files"), authController.adminSignupPost);
app.post("/doctor/signup", upload.single("files"), authController.doctorSignupPost);
app.post("/patient/signup", upload.single("files"), authController.patientSignupPost);


app.use(authRouter);
app.use(doctorRouter);
app.use(patientRouter);
app.use(adminRouter);

// router  for Autherization
app.get('/admin/*', checkuser.admin); 
app.get('/doctor/*', checkuser.doctor);
app.get('/doctor/*', checkuser.patient);

app.get('/',(req,res)=>{
  res.send("welcome to server plage");
})


/* MONGOOSE SETUP */
const port = process.env.PORT || 5000;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DataBase Connection sucessfull....')
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
