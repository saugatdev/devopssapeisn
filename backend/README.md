
# Employee Management System Backend

This is the backend for the Employee Management System built with Node.js, Express, and MongoDB. The system provides various functionalities for managing employees, attendance, leave requests, payroll, and reviews.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Controllers](#controllers)
3. [Routes](#routes)
4. [Environment Variables](#environment-variables)

---
 

## Project Setup

### Prerequisites
- Node.js (version 14+ recommended)
- MongoDB database (local or cloud-based, like MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory and defining the following:
   ```env
   PORT=3000
   CONNECTION_STRING=mongodb+srv://<your-db-connection-string>
   ACCESS_TOKEN_SECRET=<your-secret-key>
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will be running at `https://sapiens-pied.vercel.app`.

---

## Controllers

### Seed the SuperAdmin (`seedSupeadmin.js`)
- **`



### Employee Controller (`employee.controllers.js`)
- **`createemployee`**: Creates a new employee record (requires `superadmin` access).
- **`loginuser`**: Logs in an employee and generates a JWT token.
- **`getemployee`**: Retrieves employee data based on the `id`.
- **`getallemployee`**: Retrieves all employees (requires `manager` or `superadmin` access).
- **`updateemployee`**: Updates employee data (requires `superadmin` access).
- **`deleteemployee`**: Deletes an employee (requires `superadmin` access).

### Attendance Controller (`applyattendance.controllers.js`)
- **`applyattendance`**: Allows an employee to mark their attendance for the day.

### Leave Controller (`applyleave.controllers.js`)
- **`applyleave`**: Allows an employee to apply for leave.
- **`getmyleave`**: Retrieves leave data for an employee.
- **`getallleave`**: Retrieves all leave requests for approved employees.
- **`approveleave`**: Allows a manager or admin to approve or reject leave requests.

### Payroll Controller (`payroll.controllers.js`)
- Currently, no functionality defined for payroll.

---

## Routes

### `employee.routes.js`
Routes for employee actions, such as login and leave requests.

- **POST `/employee/login`**: Log in and receive a JWT token.
- **POST `/employee/getemployee`**: Get employee details.
- **POST `/employee/applyleave`**: Apply for leave.
- **POST `/employee/getmyleave`**: Get employee's leave status.
- **POST `/employee/getallleave`**: Get all leave requests.

### `manager.routes.js`
Routes for manager actions, such as employee management and leave approval.

- **POST `/manager/createemployee`**: Create a new employee.
- **POST `/manager/updateemployee`**: Update employee details.
- **POST `/manager/deleteemployee`**: Delete an employee.
- **POST `/manager/getallemployee`**: Get a list of all employees.
- **POST `/manager/approveleave`**: Approve or reject a leave request.

### `superadmin.routes.js`
Routes for superadmin actions, such as creating and managing employees.

- **POST `/superadmin/createemployee`**: Create a new employee.
- **POST `/superadmin/updateemployee`**: Update an employee's details.
- **POST `/superadmin/deleteemployee`**: Delete an employee.
- **POST `/superadmin/getallemployee`**: Get a list of all employees.
- **POST `/superadmin/approveleave`**: Approve or reject a leave request.

---

## Environment Variables

The following environment variables are required for the application:

- `PORT`: Port to run the server (default is `3000`).
- `CONNECTION_STRING`: MongoDB connection string (for connecting to the database).
- `ACCESS_TOKEN_SECRET`: Secret key used for signing JWT tokens.

---



//createemployee
{
    "id": "12345",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword123",
    "phone": "9876543210",
    "department": "IT",
    "position": "Software Engineer",
    "salary": "50000",
    "role": "employee"
}



//manager

{   "email": "sudipacharya@gmail.com",
    "password": "sudipachrya"
    }

   




hr

{  "email": "alice.hr@example.com",
  "password": "secureHRpassword"
  
  }



  employee
{   
   "email": "john.dev@example.com",
  "password": "secureEmpPassword"
  }


manager

{
     "email": "emma.manager@example.com",
  "password": "secureManagerPassword"
}





## Test File Prod 1