import mongoose from "mongoose";

const appointSchema = new mongoose.Schema({
    dr_reqs:{
        type: Array,
        default:[]
    },
    pa_reqs:{
        type: Array,
        default:[]
    },
    dr_appionts:{
        type: Array,
        default:[]
    },
    pa_appionts:{
        type: Array,
        default:[]
    },
});

export const appointModel = new mongoose.model("appoint", appointSchema);