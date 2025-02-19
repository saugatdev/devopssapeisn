import asyncHandler from "express-async-handler";
import { Leave } from "../../models/leaverequest.model.js";


//@desc-can apply to the leave
//employee/applyleave
export const applyleave = asyncHandler(async (req, res) => {
  const { employee_id, leavetype, start_date, end_date, status } = req.body;
  
  if (!employee_id || !leavetype || !start_date || !end_date) {
    return res.status(400).json({
      message: "All credentials are required",
    });
  }

  try {
    const newleave = await Leave.create({
      employee_id,
      leavetype,
      start_date,
      end_date,
      status: status || "pending",
    });

    return res.status(200).json({
      leavedata: newleave.toObject(),
    });
    
  } catch (error) {
    return res.status(400).json({
      message: "Error creating leave request",
      error: error.message
    });
  }
});

//@employee/getmyleave
export const getmyleave = asyncHandler(async (req, res) => {
    const{employee_id} = req.body;
    if(!employee_id){
        return res.status(400).json({
            message:"Employeeid is required"
        })
    }


    const leave = await Leave.find({employee_id})
    
  
    if (leave) {
      return res.status(200).json({leave});
    }
    else{
      return res.status(400)
    }
  });

  
//@desc - can get all the leave 
//manager/getallleave
//superaadmin/getallleave
//for all employee to see who is in leave today


export const getallleave = asyncHandler(async (req, res) => {
  const approvedLeaves = await Leave.find()
  .populate("employee_id", "firstName lastName");

  if (approvedLeaves.length>0) {
    return res.status(200).json({data:approvedLeaves,
      message:"Fetched Successfully"
    });
  }
  
  else{
    return res.status(401)
  }  
});


//@desc - can update the leave 
//manager/approveleave
//superadmin/approveleave

export const approveleave = asyncHandler(async (req, res) => {
  const {_id, status } = req.body;
  if (!_id || !status) {
    return res.status(400).json({
      message: "All data are Required.",
    });
  }

const approvedleave = await Leave.findOneAndUpdate(
    {_id},
    {status},
    { new: true }
)

if(!approvedleave){
    return res.status(400).json({
        message:"Error while approving the leave"
    })
}

return res.status(200).json({
    message:"Leave Status Changed",
    data:approvedleave
})

});



