import CustomError from "../utils/errorHandler.js";
import {appointModel} from '../models/appointSchema.js';
import { appointModel } from "../models/appointSchema.js";

export const appointController={

    async dr_reqs(req, res){
        try{
            const reqs = await appointModel.find({ dr_reqs });
            res.status(201).json({ reqs });
        }
        catch(err){
            res.status(404).json(err);
        }
    },

    async make_dr_reqs(req, res){
        const {firstName, lastName, spec, address, phone, email, password, picturePath } = req.body;
        const user = [{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            spec: req.body.spec,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            picturePath:{
                data: req.file.filename,
                contentType: 'image/png'
            }
        }];

        try{
            const dr = await appointModel.dr_reqs.push(user)
            await dr.save();

        }
        catch(err){

        }
    }
    
}