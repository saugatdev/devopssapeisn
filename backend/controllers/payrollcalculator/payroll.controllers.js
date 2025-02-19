import asynchandler from "express-async-handler";
import { Employee } from "../../models/employee.model.js";


//this all are the percentages

const SSF_DEDUCTION = 11; 
const PF_DEDUCTION = 10;

export const salarycalculator = asynchandler(async (req, res) => {
  const { deductionType } = req.body;

  if (!["SSF", "PF", null].includes(deductionType)) {
    return res.status(400).json({
      msg: "Enter either 'SSF', 'PF', or null for deductionType",
    });
  }

  const employees = await Employee.find();

  const salaryDetails = employees.map((employee) => {
    const baseSalary = employee.payrollInfo.salary;

    let ssfDeduction = 0;
    let pfDeduction = 0;

    if (deductionType === "SSF") {
      ssfDeduction = (baseSalary * SSF_DEDUCTION) / 100;
    } else if (deductionType === "PF") {
      pfDeduction = (baseSalary * PF_DEDUCTION) / 100;
    }

    const taxDeduction = (baseSalary * TAX) / 100;
    const totalDeductions = ssfDeduction + pfDeduction + taxDeduction;
    const netSalary = baseSalary - totalDeductions;

    return {
      name: employee.firstName,
      baseSalary,
      ssfDeduction,
      pfDeduction,
      taxDeduction,
      totalDeductions,
      netSalary,
    };
  });

  // Send the response
  res.status(200).json({
    success: true,
    salaryDetails,
  });
});
