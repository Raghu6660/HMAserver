import CustomError from "../utils/errorHandler.js";
import {adminModel} from '../models/adminSchema.js';
export const adminController={

    async adminpost (req,res,next){
        try{
            const data = await adminModel.create(req.body);
            res.status(200).json({
                success:true,
                data:data
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to Create"));
        }
    },
    async adminfetch(req,res,next){
        try{

            let email = req.body;
            console.log(email);
            const data = await adminModel.findOne(email);
            console.log(data);
            res.status(201).json({ data });
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to fetch"));
        }
    },
    
}