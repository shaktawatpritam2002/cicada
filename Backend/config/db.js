import mongoose from "mongoose";

const connectDB =  async () =>{
    try{
        if(!process.env.MONGO_URL){
            throw new Error("MongoDB URI not found");
        }
        const connect = await mongoose.connect(process.env.MONGO_URL ,{
           useNewUrlParser : true,
        });

        console.log(`MongoDB Connected:${connect.connection.host}`);
    }catch (error) {
       console.log("Not connected" , error);
       process.exit();
    }
}

export {connectDB}