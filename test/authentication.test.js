const { default: axios } = require("axios");
const dotenv = require("dotenv")

dotenv.config();
const BACKEND_URL = process.env.BACKEND_URL;

describe('Authentication', () => {

  let token;

    beforeAll(async()=>{
        const superadmin = {
            email:"adminisuper@gmail.com",
            password:"superadmin123"
        }
       const response =  await axios.post(`${BACKEND_URL}/superadmin/login`, superadmin)
       token = response.data.accessToken
        
    })

    test(`User with same email is created only once`,async()=>{

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




          const response = await axios.post(
            `${BACKEND_URL}/superadmin/createemployee`,
            newEmployee,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );          
          
          expect(response.status).toBe(201)



      try {
        const updatedResponse = await axios.post(
            `${BACKEND_URL}/superadmin/createemployee`,
            newEmployee,
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            }
          );
          expect(updatedResponse.status).not.toBe(200);
          
        
      } catch (error) {
        expect(error.response.status).toBe(400); 
        
      }


    })
  
    
    test(`User with correct credentials can login`, async()=>{
      
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


        const response = await axios.post(
          `${BACKEND_URL}/superadmin/createemployee`,
          newEmployee,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 



        const loginResponse = await axios.post(
          `${BACKEND_URL}/employee/login`,
          {
            email,
            password
          },
          
        ); 
        
        
        expect(loginResponse.status).toBe(200)






    })

    test(`User with incorrect credentials cannot login`, async()=>{
      
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


        const response = await axios.post(
          `${BACKEND_URL}/superadmin/createemployee`,
          newEmployee,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 


        try {
          const updatedResponse = await axios.post(
              `${BACKEND_URL}/employee/login`,
          
              {
                email:123,
                password
              }
            );
            expect(updatedResponse.status).not.toBe(200);
            
          
        } catch (error) {
          expect(error.response.status).toBe(401); 
          
        }







    })
    test(`User with empty field  cannot login`, async()=>{
      
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


        const response = await axios.post(
          `${BACKEND_URL}/superadmin/createemployee`,
          newEmployee,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 


        try {
          const updatedResponse = await axios.post(
              `${BACKEND_URL}/employee/login`,
          
              {
                email
              }
            );
            expect(updatedResponse.status).not.toBe(200);
            
          
        } catch (error) {
          expect(error.response.status).toBe(400); 
          
        }







    })
  

})

