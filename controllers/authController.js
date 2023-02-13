import {adminModel} from '../models/adminSchema.js';
import {doctorModel} from '../models/doctorSchema.js';
import {patientModel} from '../models/patientSchema.js';
import jwt from "jsonwebtoken";




// Handle Errors
const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};
    // Incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'this email is not registred';
    }
    // Incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'password is incorrect';
    }
    // duplication error code
    if(err.code === 11000){
        errors.email = 'Email is already registred';
        return errors;
    }
    // validate error
    if(err.message.includes('validation failed') ){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

//  creating JWT tokens
const maxAge = 3 * 24 * 60 * 60;  //determins time for 3 days
const createToken = (id) =>{
    return jwt.sign({ id }, 'mekala raghu vamsi', { expiresIn:maxAge });
}








export const authController={

    async adminLoginGet (req,res,next){
        //res.send(' admin login');
        const email = req.body.email
        console.log(email);
        try{
            const data = await adminModel.findOne({ email },(err,res)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log(res);
                }
            });
            console.log(data);
            res.status(201).json(data);
        }
        catch(err){ res.status(400).json(err)}
    },
    async adminLoginPost (req,res,next){
        
        // if(req.body.email==''||req.body.email==null){
        //     res.status(400).json("Please Enter Username or Email");
        // }
        // if(req.body.password==''||req.body.password==null){
        //     res.status(400).json("Please Enter Your Password");
        // }

        const email = req.body.email;
        const password = req.body.password;
        try{
            const admin = await adminModel.login(email,password);
            console.log("We are logined in")
            const token = createToken(admin._id);
            res.cookie('jwt', token, { httpOnly:true, maxAge: maxAge*1000 });
            // res.status(201).json({ admin:admin._id });
            res.status(201).json({ admin:admin });
        }
        catch(err){
            const errors = handleErrors(err);
            res.status(400).json(errors);
        }
        //res.send(' admin login post');
    },
    async adminSignupGet (req,res,next){
        res.send('admin signup');
    },
    async adminSignupPost (req,res,next){
        // const { firstName, lastName, email, password, picturePath} = req.body;

        const user = new adminModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            picturePath:{
                data: req.file.filename,
                contentType: 'image/png'
            }
        });
        try{
            // const admin = admin.create({ firstName, lastName, email, password, picturePath });
            const admin = await user.save();
            const token = createToken(admin._id);
            res.cookie('jwt', token, { httpOnly:true, maxAge: maxAge*1000 });
            res.status(201).json({admin:admin._id});
        }
        catch(err){
            const errors =  handleErrors(err);
            res.status(400).json({errors});
        }
        // res.send(" admin sign post");
    },







    async doctorLoginGet (req,res,next){
        res.send(' doctor login');
    },
    async doctorLoginPost (req,res,next){
        const { email, password } = req.body;
        try{
            const doctor = await doctorModel.login(email,password);
            const token = createToken(doctor._id);
            console.log(doctor._id);
            console.log(token);
            res.cookie('jwt', token, { httpOnly:true, maxAge: maxAge*1000 });
            res.status(201).json({ doctor:doctor });
        }
        catch(err){
            const errors = handleErrors(err);
            res.status(400).json(errors);
        }
        //res.send('doctor login post');
    },
    async doctorSignupGet (req,res,next){
        res.send(' doctor signup');
    },
    async doctorSignupPost (req,res,next){

        // const { firstName, lastName, spec, addresss, phone, email, password, picturePath } = req.body;
        
        const user = new doctorModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            spec: req.body.spec,
            address: req.body.address,
            phone: req.body.mobile,
            email: req.body.email,
            password: req.body.password,
            picturePath:{
                data: req.file.filename,
                contentType: 'image/png'
            }
        });

        try{
            // const doctor = doctor.create({ firstName, lastName, spec, addresss, phone, email, password, picturePath });
            const doctor = await user.save();
            const token = createToken(doctor._id);
            res.cookie('jwt', token, { httpOnly:true, maxAge: maxAge*1000 });
            res.status(201).json({doctor:doctor._id});

        }
        catch(err){
            const errors =  handleErrors(err);
            res.status(400).json(errors);
        }
        //res.send("doctor signup post");

    },






    async patientLoginGet (req,res,next){
        res.send(' patient login');
    },
    async patientLoginPost (req,res,next){
        const { email, password } = req.body;
        try{
            const patient = await patientModel.login(email,password);
            const token = createToken(patient._id);
            res.cookie('jwt', token, { httpOnly:true, maxAge: maxAge*1000 });
            res.status(201).json({ patient:patient });
        }
        catch(err){
            const errors = handleErrors(err);
            res.status(400).json( errors )
        }
        //res.send('patient login post');
    },
    async patientSignupGet (req,res,next){
        res.send(' patient signup');
    },
    async patientSignupPost (req,res,next){
        // const { firstName, lastName, addresss, phone, email, password, symptoms, picturePath } = req.body;
        const user = new patientModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phone: req.body.mobile,
            email: req.body.email,
            password: req.body.password,
            symptoms: req.body.symptoms,
            picturePath:{
                data: req.file.filename,
                contentType: 'image/png'
            }
        });

        try{
            // const patient = patient.create({ firstName, lastName, addresss, phone, email, password, symptoms, picturePath });
            const patient = await user.save();
            const token = createToken(patient._id);
            res.cookie('jwt', token, { httpOnly:true, maxAge: maxAge*1000 });
            res.status(201).json({patient:patient._id});

        }
        catch(err){
            const errors =  handleErrors(err);
            res.status(400).json(errors);
        }
        //res.send('patient signup post');

    },



    async logout (req, res, next){
        res.cookie('jwt', '', {maxAge: 1});
        res.redirect('/');
        //res.send('log out');
    }
}