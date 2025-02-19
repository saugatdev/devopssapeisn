import { Attendance } from "../../models/createattendance.model.js";
import asynchandler from "express-async-handler";

const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const check_in = asynchandler(async (req, res) => {
  const { employee_id } = req.body;

  if (!employee_id) {
    return res.status(400).json({ message: "Employee ID is required." });
  }

  const date = getCurrentDate();

  try {
    const existingRecord = await Attendance.findOne({ employee_id, date });
    if (existingRecord) {
      return res.status(400).json({ message: "Already Checked In" });
    }

    const attendance = await Attendance.create({
      employee_id: employee_id,
      check_in_time: new Date(),
      date: date,
    });

    return res.status(200).json({
      message: "Check-in successful",
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export const check_out = asynchandler(async (req, res) => {
  const { employee_id } = req.body;

  if (!employee_id) {
    return res.status(400).json({ message: "Employee ID is required." });
  }

  const date = getCurrentDate();

  try {
    const attendance = await Attendance.findOne({ employee_id, date });
    if (!attendance) {
      return res
        .status(400)
        .json({ message: "Check-in required before check-out." });
    }

    const existingCheckout = await Attendance.findOne({ employee_id, date, check_out_time: { $exists: true } });
    if (existingCheckout) {
      return res.status(400).json({ message: "Already checked out today." });
    }
    const outattendance = await Attendance.create({
      employee_id: employee_id,
      check_out_time: new Date(),
      date: date,
    });

    return res.status(200).json({
      message: "Checked out successfully.",
      outattendance,
    });
  } catch (error) {
    return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
  }
});

const someLateThreshold = new Date();
someLateThreshold.setHours(9, 0, 0, 0);

export const getmyattendance = asynchandler(async (req, res) => {
  const { employee_id } = req.body;

  if (!employee_id) {
    return res.status(400).json({
      message: "Employee ID is required.",
    });
  }

  try {
    const myattendance = await Attendance.find({ employee_id }).sort({ date: -1 });

    if (!myattendance || myattendance.length === 0) {
      return res.status(404).json({
        message: "No attendance records found for the provided Employee ID.",
      });
    }

    const formattedAttendance = myattendance.map((record) => {
      const checkInTime = new Date(record.check_in_time);

      let status = "Absent";
      
      if (record.check_in_time) {
        status = checkInTime > someLateThreshold ? "Late" : "Present";
      }

      return {
        date: record.date,
        check_in_time: record.check_in_time,
        check_out_time: record.check_out_time,
        status,
      };
    });

    return res.status(200).json({
      message: "Attendance records retrieved successfully.",
      attendance: formattedAttendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

//attendance summary
//employee/getAttendanceSummary
const getCurrentMonthRange = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const lastDay = now.toISOString().split("T")[0];
  return { firstDay, lastDay };
};

export const getAttendanceSummary = asynchandler(async (req, res) => {
  const { employee_id } = req.body;

  if (!employee_id) {
    return res.status(400).json({ message: "Employee ID is required." });
  }

  const { firstDay, lastDay } = getCurrentMonthRange();

  try {
    const attendanceRecords = await Attendance.find({
      employee_id,
      date: { $gte: firstDay, $lte: lastDay },
    });

    const totalDaysInMonth = new Date(lastDay).getDate(); 
    const presentDays = new Set(attendanceRecords.map((record) => record.date));
    const lateDays = attendanceRecords.filter((record) => {
      return new Date(record.check_in_time).getHours() > 9;
    });

    const absentDays = totalDaysInMonth - presentDays.size;

    return res.status(200).json({
      message: "Monthly overview retrieved successfully.",
      monthly_overview: {
        present_days: presentDays.size,
        absent_days: absentDays,
        late_arrivals: lateDays.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});





//superadmin/getallattendance
export const getallattendance = asynchandler(async(req,res)=>{


    const myattendance = await Attendance.find()
    .populate("employee_id","firstName lastName");

    return res.status(200).json({
         myattendance
    })

   

})




