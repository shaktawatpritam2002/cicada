import mongoose from "mongoose";
import { Schema } from "mongoose";
    
const teamSchema = Schema({
    leader_email:{
        type:String,
        required:true,
        unique: true, 
    },
    password:{
        type:String,
        required:true,
   
    },
    member1:{
        type:String,
        unique:true
    },
    member2:{
        type:String,
        unique:true
    },
    member3:{
        type:String,
        unique:true
    },
}) 

export default mongoose.model("Team", teamSchema);
