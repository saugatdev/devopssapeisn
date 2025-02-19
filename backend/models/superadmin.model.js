import mongoose, { Schema }  from "mongoose";

const superadminSchema = new Schema({
    email:{
        type:String,
        unique:true,

    },
    password:{
        type:String
    }

})

 const Superadmin = mongoose.model("Superadmin",superadminSchema)
 export default Superadmin