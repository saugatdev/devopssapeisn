import asynchandler from "express-async-handler"
import {Review} from "../../models/review.model.js"


//@employee/writereview

export const writereview = asynchandler(async(req,res)=>{
    const{by_employee, to_employee,stars,review}= req.body;

    if(!by_employee || !to_employee || !stars || !review){
        return res.status(200).json({
            message:"All fields are required"
        })
    }

    const writereview = await Review.create({
        by_employee,
        to_employee,
        stars,
        review
    })
    const populatedReview = await writereview.populate([
        { path: "by_employee", select: "firstName" },
        { path: "to_employee", select: "firstName" }
      ]);
      
  

    if (!writereview) {
        return res.status(400).json({
          message: "Error while sending the data",
        });
      } else {
        return res.status(200).json({
          data:populatedReview,
        });
      }



})

//@employee/getreview

export const getreview = asynchandler(async(req,res)=>{
    const {employee_id}= req.body;

    if(!employee_id){
        return res.status(400).json({
            message:"Fields are required"
        })
    }
    const getreview = await Review.find({to_employee: employee_id})
    return res.status(200).json({
        reviews: getreview.map(review => review.review),

    })

})


//superadmin/getallreviews

export const getallreviews = asynchandler(async(req,res)=>{
  
    const getreview = await Review.find()
    .populate("to_employee", "firstName")
    .populate("by_employee","firstName")

    return res.status(200).json({

        getreview
    })

})



