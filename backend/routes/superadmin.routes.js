import express from "express"
const router = express.Router()

import { createemployee,updateemployee,getallemployee, deleteemployee} from "../controllers/createusers/employee.controllers.js"
import { approveleave, getallleave } from "../controllers/leave/applyleave.controllers.js"
import { validatesuperadmin } from "../seedSuperadmin.js"
import { loginSuperadmin } from "../controllers/loginsuperadmin/superadminlogin.controllers.js"
import superadmintoken from "../middleware/superadminvalidatetoken.js"
import { salarycalculator} from "../controllers/payrollcalculator/payroll.controllers.js"
import { getallreviews } from "../controllers/calculatereview/review.controllers.js"
import { getallattendance } from "../controllers/attendance/applyattendance.controllers.js"
import { generateAIReport } from "../controllers/analyticsreport/monthlyreportcontroller.js"

//seedadmin && loginadmin
router.post("/seedadmin",validatesuperadmin)
router.post("/login",loginSuperadmin)

//crud employee
router.post("/createemployee",superadmintoken,createemployee)
router.post("/updateemployee",superadmintoken,updateemployee)
router.post("/deleteemployee",superadmintoken,deleteemployee)
router.get("/getallemployee",getallemployee)

//leave
router.post("/getallleave",superadmintoken,getallleave)
router.post("/approveleave",superadmintoken,approveleave)

//payroll
router.post("/payroll",superadmintoken,salarycalculator)

//review
router.post("/getallreviews",superadmintoken,getallreviews)

//attendance
router.post("/getallattendance",superadmintoken,getallattendance)


router.post("/report",superadmintoken,generateAIReport)



export default router