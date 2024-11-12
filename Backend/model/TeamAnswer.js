import mongoose from "mongoose";
import { Schema } from "mongoose";
    
const teamAnswer = Schema({
    TeamId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:true
    },
    Quiz1:{
        type:String
    },
    Quiz2:{
        type:String
    },
    Quiz3:{
        type:String
    },
    Quiz4:{
        type:String
    },
    Quiz5:{
        type:String
    },
    Quiz6:{
        type:String
    },
    Quiz7:{
        type:String
    },
    Quiz8:{
        type:String
    },
    Quiz9:{
        type:String
    },
    Quiz10:{
        type:String
    }
}) 

export default mongoose.model("TeamAnswer", teamAnswer);
