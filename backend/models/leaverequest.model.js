import mongoose, { Schema } from "mongoose";

const leaveSchema = new Schema(
  {

    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    leavetype: {
      type: String,
    },

    start_date: {
      type: String,
    },

    end_date: {
      type: String,
    },

    status:{
        type:String,
        enum : [ 'pending', 'approved', 'rejected'],
        default: 'pending'
    }
  },
  {
    timestamps: true,
  }
);

export const Leave = mongoose.model("Leave", leaveSchema);
