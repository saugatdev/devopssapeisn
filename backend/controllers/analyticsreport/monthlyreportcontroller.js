import { GoogleGenerativeAI } from '@google/generative-ai';
import { Attendance } from '../../models/createattendance.model.js';
import { Review } from '../../models/review.model.js';
import { Leave } from '../../models/leaverequest.model.js';
import asynchandler from 'express-async-handler';
import { Employee } from '../../models/employee.model.js';

const genAI = new GoogleGenerativeAI("AIzaSyBH5KPKwFiP6iDpqlUO0TsnJhbSjEFgJV0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getCurrentMonthRange = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const lastDay = now.toISOString().split("T")[0];
  return { firstDay, lastDay };
};

const generateAIReport = asynchandler(async (req, res) => {
  const { employee_id } = req.body;

  if (!employee_id) {
    return res.status(400).json({ message: "Employee ID is required." });
  }

  try {
    // Fetch Employee Details
    const employee = await Employee.findOne({ _id: employee_id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Fetch Attendance Summary
    const { firstDay, lastDay } = getCurrentMonthRange();
    const attendanceRecords = await Attendance.find({
      employee_id,
      date: { $gte: firstDay, $lte: lastDay },
    });
    
    const totalDaysInMonth = new Date(lastDay).getDate();
    const presentDays = new Set(attendanceRecords.map((record) => record.date));
    const lateDays = attendanceRecords.filter((record) => new Date(record.check_in_time).getHours() > 9);
    const absentDays = totalDaysInMonth - presentDays.size;

    const attendanceSummary = {
      present_days: presentDays.size,
      absent_days: absentDays,
      late_arrivals: lateDays.length,
    };

    // Fetch Leave Data
    const leaveRecords = await Leave.find({ employee_id });
    
    // Fetch Reviews for the Employee
    const reviews = await Review.find({ to_employee: employee_id });
    const reviewSummaries = reviews.map(review => review.review);
    const reviewStar = reviews.map(review=>review.stars)

    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];

    // Construct the AI prompt
    const prompt = `
      Generate a monthly report for the employee with the following details (Monthly Report as of ${currentDate}):
      
      - **Employee Name:** ${employee.firstName + employee.lastName}
      - **Department:** ${employee.employmentDetails.department}
      - **Position:** ${employee.employmentDetails.position}
      
      **Attendance Summary for the Month:**
      - Total Present Days: ${attendanceSummary.present_days}
      - Total Absent Days: ${attendanceSummary.absent_days}
      - Total Late Arrivals: ${attendanceSummary.late_arrivals}

      **Leave Records:**
      - ${leaveRecords.length > 0 ? leaveRecords.map(leave => `Leave Type: ${leave.leavetype}, Start Date: ${leave.start_date}, End Date: ${leave.end_date}`).join("\n") : "No leave records for this month."}
      
      **Reviews:**
      - ${reviewSummaries.length > 0 ? reviewSummaries.join("\n") : "No reviews available for this employee."}
       - ${reviewStar.length > 0 ? reviewStar.join("\n") : "No reviews star available for this employee."}

      
      Generate a professional summary based on the above information.
    `;

    // Log the generated prompt for debugging
    console.log("AI Prompt:", prompt);

    // Generate content using the model
    const result = await model.generateContent(prompt);

    // Log the result from the AI model
    console.log("AI Model Response:", result.response.text());

    return res.status(200).json({ text: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    return res.status(500).json({ error: "Failed to generate content" });
  }
});

export { generateAIReport };
