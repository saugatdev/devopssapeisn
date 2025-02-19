import asyncHandler from "express-async-handler";
import { Employee } from "../../models/employee.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

//@desc can create the employee, admin route
//superadmin access
//superadmin/createemployee

export const createemployee = asyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    contactNumber,
    address,
    dateofBirth,
    gender,
    role,
    employmentDetails,
    emergencyContact,
    payrollInfo, 
  } = req.body;

  // Validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !contactNumber ||
    !role ||
    !emergencyContact ||
    !payrollInfo
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the employee already exists
  const employeeAvailable = await Employee.findOne({ email });
  if (employeeAvailable) {
    return res.status(400).json({ message: "User already exists with the same email" });  }



  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new employee
  const newEmployee = await Employee.create({
    firstName,
    middleName,
    lastName,
    email,
    password: hashedPassword,
    contactNumber,
    address,
    dateofBirth,
    gender,
    role,
    employmentDetails: {
      employeeId:employmentDetails.employeeId,
      designation:employmentDetails.designation,
      department:employmentDetails.department,
      dateofJoining:employmentDetails.dateofJoining,
      workLocation:employmentDetails.workLocation,
      employmentType:employmentDetails.employmentType,
      position: employmentDetails.position
    },
    emergencyContact: {
      name: emergencyContact.name,
      relationship: emergencyContact.relationship,
      contactNumber: emergencyContact.contactNumber,
    },
    payrollInfo: {
      salary: payrollInfo.salary,
      bankAccount: payrollInfo.bankAccount,
      taxId: payrollInfo.taxId,
      ssn: payrollInfo.ssn,
      healthInsurance: payrollInfo.healthInsurance,
    },
  });

  // Check if the employee was created successfully
  if (newEmployee) {
    return res.status(201).json({newEmployee});
  } else {
    return res.status(400).json({
      message: "Error creating employee",
    });
  }
});


//desc- can login //login is done to create a json token
//the json is taken over the middleware and been checking for the every routes to be passed?
//@employee/login
//@manager/login

export const loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await Employee.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  console.log("Password from request:", password);
  console.log("Password from database:", user.password);

  if (!password || !user.password) {
    return res.status(400).json({ message: "Invalid credentials: missing password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "50h" }
    );

    return res.status(200).json({ accessToken, user });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});



//@desc can get the employee, admin route
//superadmin/getallemployee

export const getallemployee = asyncHandler(async (req, res) => {
  try {
    const records = await Employee.find();
    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({
      message: "Interval Sever Error",
    });
  }
});

//@desc can get the update the employee, admin route
//superadmin/updateemployee

export const updateemployee = asyncHandler(async (req, res) => {
  const { id } = req.params; // Employee ID passed as a parameter
  const {
    firstName,
    middleName,
    lastName,
    email,
    contactNumber,
    address,
    dateofBirth,
    gender,
    role,
    employmentDetails,
    emergencyContact,
    payrollInfo,
  } = req.body;

  // Find the employee by ID
  const employee = await Employee.findById(id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  // Update only fields that are provided
  if (firstName) employee.firstName = firstName;
  if (middleName) employee.middleName = middleName;
  if (lastName) employee.lastName = lastName;
  if (email) employee.email = email;
  if (password) employee.password = password;
  if (contactNumber) employee.contactNumber = contactNumber;
  if (address) employee.address = address;
  if (dateofBirth) employee.dateofBirth = dateofBirth;
  if (gender) employee.gender = gender;
  if (role) employee.role = role;

  // Update employmentDetails
  if (employmentDetails) {
    employee.employmentDetails = {
      ...employee.employmentDetails,
      ...employmentDetails, // Merge existing and new details
    };
  }

  // Update emergencyContact
  if (emergencyContact) {
    employee.emergencyContact = {
      ...employee.emergencyContact,
      ...emergencyContact, // Merge existing and new emergency contact info
    };
  }

  // Update payrollInfo
  if (payrollInfo) {
    employee.payrollInfo = {
      ...employee.payrollInfo,
      ...payrollInfo, // Merge existing and new payroll info
    };
  }

  // Save updated employee details
  const updatedEmployee = await employee.save();

  // Respond with updated employee data
  return res.status(200).json({
    _id: updatedEmployee._id,
    firstName: updatedEmployee.firstName,
    middleName: updatedEmployee.middleName,
    lastName: updatedEmployee.lastName,
    email: updatedEmployee.email,
    contactNumber: updatedEmployee.contactNumber,
    address: updatedEmployee.address,
    dateofBirth: updatedEmployee.dateofBirth,
    gender: updatedEmployee.gender,
    role: updatedEmployee.role,
    employmentDetails: updatedEmployee.employmentDetails,
    emergencyContact: updatedEmployee.emergencyContact,
    payrollInfo: updatedEmployee.payrollInfo,
  });
});


//@desc can get the delete the employee, admin route
//superadmin/deleteemployee
//pass the id in the params or body will work

export const deleteemployee = asyncHandler(async (req, res) => {
  const {_id } = req.body || req.params;
  if (!_id) {
    return res.status(400).json({
      message: "Id cannot be found",
    });
  }

  const deletedemployee = await Employee.findByIdAndDelete({_id });

  if (deletedemployee) {
    return res.status(200).json("Employee Deleted successfuly");
  }
});

//@desc can get the employee, admin route
//employee/getemployee
//pass the id in the req.body or in params will work

export const getemployee = asyncHandler(async (req, res) => {
  const _id = req.body?._id || req.params?._id;

  if (!_id) {
    return res.status(400).json({ message: "_id is required" });
  }

  try {
    const record = await Employee.findById(_id);

    if (!record) {
      return res.status(404).json({ message: "No employee found with this ID" });
    }

    return res.status(200).json(record); 
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

