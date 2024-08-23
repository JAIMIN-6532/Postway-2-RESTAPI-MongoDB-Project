import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    otp:{type:Number},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    createdat:{type:Date,default:Date.now}
})

const OtpModel = new mongoose.model('OtpModel',OtpSchema);

export default OtpModel;