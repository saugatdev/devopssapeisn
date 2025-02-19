const { default: axios } = require("axios");
const dotenv = require("dotenv")

dotenv.config();
const BACKEND_URL = process.env.BACKEND_URL;

describe('Leave Application from role employee', () => {

  let admintoken;
  let usertoken;
  let employeeId;
  let leaveId;

  beforeAll(async()=>{
    const superadmin={
      email:"adminisuper@gmail.com",
      password:"superadmin123"
    }

    const response = await axios.post(`${BACKEND_URL}/superadmin/login`, superadmin)
    admintoken = response.data.accessToken

    const email = "saugatghimire" + Math.random() + "@example.com";  
    const contactNumber= Math.floor(1000000000 + Math.random() * 9000000000);
    const password=  "Password123";
    
    const newEmployee = {
      firstName: "saugat",
      lastName: "ghimire",
      email: email,
      password: password,
      contactNumber: contactNumber,
      address: "123 Street",
      dateofBirth: "1990-01-01",
      gender: "Male",
      role: "employee",
      employmentDetails: {
        employeeId: "E123",
        designation: "Software Engineer",
        department: "IT",
        dateofJoining: "2023-01-01",
        workLocation: "Office A",
        employmentType: "Full-time",
        position: "Senior Developer",
      },
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Wife",
        contactNumber: "9876543210",
      },
      payrollInfo: {
        salary: 50000,
        bankAccount: "1234567890",
        taxId: "TX12345",
        ssn: "SSN123456",
        healthInsurance: "Ins12345",
      },
    };

    const createResponse = await axios.post(`${BACKEND_URL}/superadmin/createemployee`,newEmployee,{
      headers:{
        Authorization:`Bearer ${admintoken}`
      }
    })

    expect (createResponse.status).toBe(201)
    employeeId = createResponse.data.newEmployee._id
    console.log(`this is employee id : ${employeeId}`)




    const loginResponse = await axios.post(`${BACKEND_URL}/employee/login`,{
      email,
      password
    })

    expect(loginResponse.status).toBe(200)
    usertoken = loginResponse.data.accessToken;
  })

  test('should be able to apply leave', async() => {
   const employee_id= employeeId;
   const leavetype= "random leave";
   const start_date="apple";
   const end_date= "ball";
   const status= "pending";
    

    const leavereponse = await axios.post(`${BACKEND_URL}/employee/applyleave`,{

      employee_id,
      leavetype,
      start_date,
      end_date,
      status
    },{
      headers:{
        Authorization :`Bearer ${usertoken}`
      }
    })

    expect (leavereponse.status).toBe(200)
    leaveId =leavereponse.data.leavedata._id
    console.log(`This is the leaveId ${leaveId}`)

    
  })
  

  test('should be able to get own leave', async() => {

    const employee_id = employeeId;
    
    const getleave = await axios.post(`${BACKEND_URL}/employee/getmyleave`,{employee_id},{
      headers:{
        Authorization:`Bearer ${usertoken}`
      }
    })
    
    expect(getleave.status).toBe(200)



  
  })



  
  test('should not be able to getallleave', async() => {
    try {
      const getallleave = await axios.post(
        `${BACKEND_URL}/employee/getallleave`,
        {},  
        {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        }
      );
    } catch (error) {

      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(401);
      expect(error.response.data.message).toBe("Access Denied");
    }
});


test('should not be able to approveleave', async() => {
  try {
    const getallleave = await axios.post(
      `${BACKEND_URL}/employee/getallleave`,
      {},  
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      }
    );
  } catch (error) {

    expect(error.response).toBeDefined();
    expect(error.response.status).toBe(401);
    expect(error.response.data.message).toBe("Access Denied");
  }
});


  

})


describe('Leave Application from role hr', () => {

  let admintoken;
  let usertoken;
  let employeeId;
  let leaveId;

  beforeAll(async()=>{
    const superadmin={
      email:"adminisuper@gmail.com",
      password:"superadmin123"
    }

    const response = await axios.post(`${BACKEND_URL}/superadmin/login`, superadmin)
    admintoken = response.data.accessToken



    const email = "saugatghimire" + Math.random() + "@example.com";  
    const contactNumber= Math.floor(1000000000 + Math.random() * 9000000000);
    const password=  "Password123";
    
  
    const newEmployee = {
      firstName: "saugat",
      lastName: "ghimire",
      email: email,
      password: password,
      contactNumber: contactNumber,
      address: "123 Street",
      dateofBirth: "1990-01-01",
      gender: "Male",
      role: "hr",
      employmentDetails: {
        employeeId: "E123",
        designation: "Software Engineer",
        department: "IT",
        dateofJoining: "2023-01-01",
        workLocation: "Office A",
        employmentType: "Full-time",
        position: "Senior Developer",
      },
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Wife",
        contactNumber: "9876543210",
      },
      payrollInfo: {
        salary: 50000,
        bankAccount: "1234567890",
        taxId: "TX12345",
        ssn: "SSN123456",
        healthInsurance: "Ins12345",
      },
    };

    const createResponse = await axios.post(`${BACKEND_URL}/superadmin/createemployee`,newEmployee,{
      headers:{
        Authorization:`Bearer ${admintoken}`
      }
    })

    expect (createResponse.status).toBe(201)
    employeeId = createResponse.data.newEmployee._id
    console.log(`this is employee id : ${employeeId}`)




    const loginResponse = await axios.post(`${BACKEND_URL}/employee/login`,{
      email,
      password
    })

    expect(loginResponse.status).toBe(200)
    usertoken = loginResponse.data.accessToken;
  })

  test('should be able to apply leave', async() => {
   const employee_id= employeeId;
   const leavetype= "random leave";
   const start_date="apple";
   const end_date= "ball";
   const status= "pending";
    

    const leavereponse = await axios.post(`${BACKEND_URL}/employee/applyleave`,{

      employee_id,
      leavetype,
      start_date,
      end_date,
      status
    },{
      headers:{
        Authorization :`Bearer ${usertoken}`
      }
    })

    expect (leavereponse.status).toBe(200)
    leaveId =leavereponse.data.leavedata._id
    console.log(`This is the leaveId ${leaveId}`)

    
  })
  

  test('should be able to get own leave', async() => {

    const employee_id = employeeId;
    
    const getleave = await axios.post(`${BACKEND_URL}/employee/getmyleave`,{employee_id},{
      headers:{
        Authorization:`Bearer ${usertoken}`
      }
    })
    
    expect(getleave.status).toBe(200)



  
  })



  
  test('should  be able to getallleave', async() => {
    const getallleave = await axios.post(`${BACKEND_URL}/employee/getallleave`,
      {},  
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      }

    );

    expect (getallleave.status).toBe(200)
});


test('should be able to approveleave', async() => {
  const approveleave = await axios.post(
    `${BACKEND_URL}/employee/approveleave`,
    {
      _id:leaveId,
      status:"approved"
    },  
    {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    }

  );

  expect(approveleave.status).toBe(200)


});


  

})

describe('Leave Application from role Manager', () => {

  let admintoken;
  let usertoken;
  let employeeId;
  let leaveId;

  beforeAll(async()=>{
    const superadmin={
      email:"adminisuper@gmail.com",
      password:"superadmin123"
    }

    const response = await axios.post(`${BACKEND_URL}/superadmin/login`, superadmin)
    admintoken = response.data.accessToken



    const email = "saugatghimire" + Math.random() + "@example.com";  
    const contactNumber= Math.floor(1000000000 + Math.random() * 9000000000);
    const password=  "Password123";
    
  
    const newEmployee = {
      firstName: "saugat",
      lastName: "ghimire",
      email: email,
      password: password,
      contactNumber: contactNumber,
      address: "123 Street",
      dateofBirth: "1990-01-01",
      gender: "Male",
      role: "manager",
      employmentDetails: {
        employeeId: "E123",
        designation: "Software Engineer",
        department: "IT",
        dateofJoining: "2023-01-01",
        workLocation: "Office A",
        employmentType: "Full-time",
        position: "Senior Developer",
      },
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Wife",
        contactNumber: "9876543210",
      },
      payrollInfo: {
        salary: 50000,
        bankAccount: "1234567890",
        taxId: "TX12345",
        ssn: "SSN123456",
        healthInsurance: "Ins12345",
      },
    };

    const createResponse = await axios.post(`${BACKEND_URL}/superadmin/createemployee`,newEmployee,{
      headers:{
        Authorization:`Bearer ${admintoken}`
      }
    })

    expect (createResponse.status).toBe(201)
    employeeId = createResponse.data.newEmployee._id
    console.log(`this is employee id : ${employeeId}`)




    const loginResponse = await axios.post(`${BACKEND_URL}/employee/login`,{
      email,
      password
    })

    expect(loginResponse.status).toBe(200)
    usertoken = loginResponse.data.accessToken;
  })

  test('should be able to apply leave', async() => {
   const employee_id= employeeId;
   const leavetype= "random leave";
   const start_date="apple";
   const end_date= "ball";
   const status= "pending";
    

    const leavereponse = await axios.post(`${BACKEND_URL}/employee/applyleave`,{

      employee_id,
      leavetype,
      start_date,
      end_date,
      status
    },{
      headers:{
        Authorization :`Bearer ${usertoken}`
      }
    })

    expect (leavereponse.status).toBe(200)
    leaveId =leavereponse.data.leavedata._id
    console.log(`This is the leaveId ${leaveId}`)

    
  })
  

  test('should be able to get own leave', async() => {

    const employee_id = employeeId;
    
    const getleave = await axios.post(`${BACKEND_URL}/employee/getmyleave`,{employee_id},{
      headers:{
        Authorization:`Bearer ${usertoken}`
      }
    })
    
    expect(getleave.status).toBe(200)



  
  })



  
  test('should  be able to getallleave', async() => {
    const getallleave = await axios.post(`${BACKEND_URL}/employee/getallleave`,
      {},  
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      }

    );

    expect (getallleave.status).toBe(200)
});


test('should  be able to approveleave', async() => {
  const approveleave = await axios.post(
    `${BACKEND_URL}/employee/approveleave`,
    {
      _id:leaveId,
      status:"approved"
    },  
    {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    }

  );

  expect(approveleave.status).toBe(200)


});


  

})
