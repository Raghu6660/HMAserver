import jwt from 'jsonwebtoken';
import { adminModel } from '../models/adminSchema.js';
import { doctorModel } from '../models/doctorSchema.js';
import { patientModel } from '../models/patientSchema.js';


// Require Authentication
export const requireAuth={
    admin(req, res, next){
    
        const token = req.cookies.jwt;
        // checking json web token exits & is verified
        if(token){
            jwt.verify(token, 'mekala raghu vamsi', (err, decodedToken)=>{
                if(err){
                    console.log(err.message);
                    res.redirect('/admin');
                }else{
                    console.log(decodedToken);
                    next();
                }
            })
        }
        else{
            res.redirect('/admin');
        }
    },
    doctor(req, res, next){
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token, 'mekala raghu vamsi', (err, decodedToken)=>{
                if(err){
                    console.log(err.message);
                    res.redirect('/doctor');
                }else{
                    console.log(decodedToken);
                    next();
                }
            })
        }
        else{
            res.redirect('/doctor');
        }
    },
    patient(req, res, next){
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token, 'mekala raghu vamsi', (err, decodedToken)=>{
                if(err){
                    console.log(err.message);
                    res.redirect('/patient');
                }else{
                    console.log(decodedToken);
                    next();
                }
            })
        }
        else{
            res.redirect('/patient');
        }
    }
};




// checking user
export const checkuser={
    admin(req, res, next){
        const token = req.cookies.jwt;// checking json web token exits & is verified
        if(token){
            jwt.verify(token, 'mekala raghu vamsi', async(err, decodedToken)=>{
                if(err){
                    console.log(err.message);
                    res.locals.admin = null;
                    next();
                }else{
                    console.log(decodedToken);
                    let admin = await adminModel.findById(decodedToken.id);
                    res.locals.admin = admin;
                    next();
                }
            })
        }
        else{
            res.locals.admin = null;
            next();
        }
    },
    doctor(req, res, next){
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token, 'mekala raghu vamsi', async(err, decodedToken)=>{
                if(err){
                    console.log(err.message);
                    res.locals.doctor = null;
                    next();
                }else{
                    console.log(decodedToken);
                    let doctor = await doctorModel.findById(decodedToken.id);
                    res.locals.doctor = doctor;
                    next();
                }
            })
        }
        else{
            res.locals.doctor = null;
            next();
        }
    },
    patient(req, res, next){
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token, 'mekala raghu vamsi', async(err, decodedToken)=>{
                if(err){
                    console.log(err.message);
                    res.locals.patient = null;
                    next();
                }else{
                    console.log(decodedToken);
                    let patient = await patientModel.findById(decodedToken.id);
                    res.locals.patient = patient;
                    next();
                }
            })
        }
        else{
            res.locals.patient = null;
            next();
        }
    }
}
