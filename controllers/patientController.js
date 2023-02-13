import CustomError from "../utils/errorHandler.js";
import {patientModel} from '../models/patientSchema.js';

export const patientController={

    async patientpost (req,res,next){
        try{
            const data = await patientmodel.create(req.body);
            res.status(200).json({
                success:true,
                data:data
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to Create"));
        }
    },
    async patientfetch(req,res,next){
        try{
            const data = await patientModel.find({});
            res.send(data);
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to fetch"));
        }
    }
    
}