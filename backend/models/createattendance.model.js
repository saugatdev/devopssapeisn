import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    check_in_time: {
        type: Date
    },
    check_out_time: {
        type: Date
    }
});

export const Attendance = mongoose.model("Attendance", attendanceSchema);