import mongoose,{Schema} from "mongoose";


export const EmergencyContactSchema = new Schema({
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    contactNumber: { 
        type: String, 
        validate: /^[0-9]{10}$/, 
        required: true,
    },
});

export const PayrollInfoSchema = new Schema({
    salary: { type: Number, min: 0 },
    bankAccount: { type: String },
    taxId: { type: String },
    ssn: { type: String },
    healthInsurance: { type: String },
});



const employeeSchema = new Schema({

    firstName:{
        type:String
    },
    middleName:{
        type:String
    },
    lastName:{
        type:String
    },
    address:{
        type:String
    },
    contactNumber:{
        type:String,
                validate: /^[0-9]{10}$/, 
        unique:true,

    },

    dateofBirth:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    gender:{
       type:String
    },
    role: {
        type: String,
        enum: ["manager", "employee","hr"],
        default: "employee",
    },

    emergencyContact: EmergencyContactSchema,

    employmentDetails:{
        employeeId:{
            type:String,
        },
        designation:{
            type:String
        },
        department:{
            type:String
        },
        dateofJoining:{
            type:String
        },

        employmentType:{
            type:String
        },
        workLocation:{
            type:String
        },
        position:{
            type: String
        },

      },

      payrollInfo: PayrollInfoSchema,



},
{
    timestamps:true
})



export const Employee = mongoose.model("Employee", employeeSchema)