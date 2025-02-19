import express from "express"
const router = express.Router()

import {getemployee,getallemployee,loginuser, createemployee, updateemployee,deleteemployee} from "../controllers/createusers/employee.controllers.js"
import { approveleave,applyleave, getmyleave,getallleave } from "../controllers/leave/applyleave.controllers.js"
import validateToken from "../middleware/validatetoken.js"
import authorizeRoles from "../middleware/validaterole.js"
import { getallreviews, getreview, writereview } from "../controllers/calculatereview/review.controllers.js"
import { check_in, check_out, getallattendance, getAttendanceSummary, getmyattendance } from "../controllers/attendance/applyattendance.controllers.js"
import{salarycalculator} from "../controllers/payrollcalculator/payroll.controllers.js"
import { generateAIReport } from "../controllers/analyticsreport/monthlyreportcontroller.js"


//mutal roles for  manager, employee and hr
router.post("/login",loginuser)
router.post("/getemployee",validateToken,authorizeRoles("employee","manager","hr"),getemployee)
router.post("/applyleave",validateToken,authorizeRoles("employee","manager","hr"),applyleave)
router.post("/getmyleave",validateToken,authorizeRoles("employee","manager","hr"),getmyleave)
router.post("/writereview",validateToken,authorizeRoles("employee","manager","hr"),writereview)
router.post("/getreview",validateToken,authorizeRoles("employee","manager","hr"),getreview)

//attendance
router.post("/check_in",validateToken,authorizeRoles("employee","manager","hr"),check_in)
router.post("/check_out",validateToken,authorizeRoles("employee","manager","hr"),check_out)
router.post("/getmyattendance",validateToken,authorizeRoles("employee","manager","hr"),getmyattendance)



//@roles  to manager and hr
router.post("/getallemployee",validateToken,authorizeRoles("manager","hr"),getallemployee)
router.post("/getallleave",validateToken,authorizeRoles("manager","hr"),getallleave)
router.post("/approveleave",validateToken,authorizeRoles("manager","hr"),approveleave)

router.post("/getAttendanceSummary",validateToken,authorizeRoles("manager","hr","employee"),getAttendanceSummary)





//crud employee
//role only to hr
router.post("/createemployee",createemployee)
router.post("/updateemployee",validateToken,authorizeRoles("hr"),updateemployee)
router.post("/deleteemployee",validateToken,authorizeRoles("hr"),deleteemployee)

//payroll
router.post("/payroll",validateToken,authorizeRoles("hr"),salarycalculator)

//review
router.post("/getallreviews",validateToken,authorizeRoles("hr"),getallreviews)

//attendance
router.post("/getallattendance",validateToken,authorizeRoles("hr"),getallattendance)

//employees today on leave

router.post("/report",validateToken,authorizeRoles("hr"),generateAIReport)


export default router



