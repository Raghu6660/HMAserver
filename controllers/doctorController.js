import CustomError from "../utils/errorHandler.js";
import {doctorModel} from '../models/doctorSchema.js';

export const doctorController={

    async doctorpost (req,res,next){
        try{
            const data = await doctorModel.create(req.body);
            res.status(200).json({
                success:true,
                data:data
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to Create"));
        }
    },
    async doctorfetch(req,res,next){
        try{
            const data = await doctorModel.find({});
            res.status(201).json(data);
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to fetch"));
        }
    },
    
}