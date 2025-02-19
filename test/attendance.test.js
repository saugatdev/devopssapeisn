const axios = require("axios")
const dotenv = require("dotenv");

dotenv.config()
const BACKEND_URL= process.env.BACKEND_URL;

/*test routes
check_in
check_out
getmyattendance
getAttendanceSummary
*/

// Flow goes from
// superadmin loggs in,
// superadmin create a employee,
// employee logs in,
// check_in, check_out,
// get my attendance,
// getmyattendancesummary


describe('Attendance Testing', () => {

    let admintoken;
    let usertoken;
    let employeeId;

    beforeAll(async()=>{

        const superadmin ={
         email : "adminisuper@gmail.com",
         password : "superadmin123"
        }

        const superadminlogin = await axios.post(`${BACKEND_URL}/superadmin/login`, superadmin
        )

        expect(superadminlogin.status).toBe(200)
        admintoken = superadminlogin.data.accessToken;


        
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
        


  const createEmployee = await axios.post(`${BACKEND_URL}/superadmin/createemployee`,
        newEmployee, {
        headers:{
          Authorization : `Bearer ${admintoken}`
        }});
       expect(createEmployee.status).toBe(201);


    const employeeLogin = await axios.post(`${BACKEND_URL}/employee/login`,{
        email,
        password
      })  
  
      expect(employeeLogin.status).toBe(200);
      usertoken = employeeLogin.data.accessToken;
      employeeId = employeeLogin.data.user._id
  
      console.log(`This is log from the attendance it have employeeid as ${employeeId}`)
    
      });

      test('should be able to check_in only once in a day', async() => {

        const getCurrentDate = () => {
          return new Date().toISOString().split("T")[0];
        };
        const date = getCurrentDate();
        const checkinResponse = await axios.post(`${BACKEND_URL}/employee/check_in`,{
          employee_id: employeeId,
          check_in_time: new Date(),
          date: date
        },{
          headers:{
            Authorization : `Bearer ${usertoken}`
          }
        })

        expect(checkinResponse.status).toBe(200)

       try {
        const updatedResponse = await axios.post(`${BACKEND_URL}/employee/check_in`,{
          employee_id:employeeId,
          check_in_time: new Date(),
          date:date,
        },{
          headers:{
            Authorization: `Bearer ${usertoken}`
          }
        })

        expect(updatedResponse.status).not.toBe(200)
        
       } catch (error) {
        expect (error.response.status).toBe(400)
        
       }



        
      })
      test('should be able to check_out only once in a day', async() => {

        const getCurrentDate = () => {
          return new Date().toISOString().split("T")[0];
        };
        const date = getCurrentDate();
        const checkinResponse = await axios.post(`${BACKEND_URL}/employee/check_out`,{
          employee_id: employeeId,
          check_out_time: new Date(),
          date: date
        },{
          headers:{
            Authorization : `Bearer ${usertoken}`
          }
        })

        expect(checkinResponse.status).toBe(200)

       try {
        const updatedResponse = await axios.post(`${BACKEND_URL}/employee/check_in`,{
          employee_id:employeeId,
          check_out_time: new Date(),
          date:date,
        },{
          headers:{
            Authorization: `Bearer ${usertoken}`
          }
        })

        expect(updatedResponse.status).not.toBe(200)
        
       } catch (error) {
        expect (error.response.status).toBe(400)
        
       }



        
      })
      
      // test("should be able to get attendance summary",async()=>{

      //   const attendandeSummaryResponse = 

      // })


      
   
      



 


    
})
