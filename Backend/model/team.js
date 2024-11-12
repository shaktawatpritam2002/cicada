import mongoose from "mongoose";
import { Schema } from "mongoose";
    
const teamSchema = Schema({
    leader_email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    member1:{
        type:String,
    },
    member2:{
        type:String,
    },
    member3:{
        type:String,
    },
}) 

export default mongoose.model("Team", teamSchema);
