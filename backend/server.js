import express from "express"
import dotenv from 'dotenv';
import {connectDb} from "./db/dbconnection.js";
import cors from "cors";
import employee from "./routes/employee.routes.js"
import superadmin from "./routes/superadmin.routes.js"



const app = express();
const PORT = process.env.PORT;
app.use(cors())
app.use(express.json()); 
connectDb();

dotenv.config();

app.get("/test",(req,res)=>{
    res.send("Test is working fine")
})

app.use("/employee",employee)

app.use("/superadmin",superadmin)


app.listen(PORT,(req,res)=>{
    console.log(`Host is running over the ${PORT}`);
    
})