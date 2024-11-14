//index.js
import express from "express";
import { configDotenv } from "dotenv";
import {connectDB} from "./config/db.js";
import cookieParser from 'cookie-parser';
import TeamRouter from "./routes/teamRoute.js"
import cors from "cors"
const app = express();
app.use(cors())
app.use(express.json())
configDotenv();
connectDB();


app.get("/",(req,res)=>{
    res.send("API is runnig successfully");
})
 // to tell the server to take json data
// define the userRoutes

app.use('/api/team', TeamRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT , ()=>{
    console.log(`Connected to the server ${PORT}`)
})