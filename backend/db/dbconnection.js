import mongoose from "mongoose"

export const connectDb = async()=>{
    try {

        const connect = await mongoose.connect(process.env.CONNECTION_STRING,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            maxPoolSize:10,
        });
        console.log("CONNECTED",connect.connection.host);

        
        
    } catch (error) {
        console.log(error);
    
    }
}

