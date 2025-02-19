import asyncHandler from "express-async-handler";
import Superadmin from "./models/superadmin.model.js";
import dotenv from 'dotenv';
dotenv.config(); 
import bcrypt from "bcrypt"


export const validatesuperadmin = asyncHandler(async(req,res)=>{
    
    const email = process.env.EMAIL;

    console.log({email});

    const exisitingSuperadmin = await Superadmin.findOne({email})

    if(exisitingSuperadmin){
        res.status(400).json({
            message:"Superadmin already exits"

        })
    }
    const hashedPassword = await bcrypt.hash(process.env.PASSWORD,10)

    const role = process.env.ROLE
    const seedsuperadmin = await Superadmin.create({
        email,
        password:hashedPassword,
    })
    if(!seedsuperadmin){
        res.status(400).json({
            message:"Not seeded the superadmin"
        })
    }
    
    
    res.status(200).json({
        message:"superadmin done creating",
        data:seedsuperadmin
        
    })
})

