import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {

    by_employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    to_employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },

      stars:{
        type:Number,
        enum:[1,2,3,4,5]
      },

    review:{
        type:String,
    }
},
  {
    timestamps: true,
  }
);

export const Review = mongoose.model("Review", reviewSchema);
