import crypto from 'crypto';
import OtpModel from './otpSchema.js';
import { UserModel } from '../user/userSchema.js';

export default class OtpRepository {
    async sendOtp(userId) {
        const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
        const otpDoc = new OtpModel({ otp, userId });
        await otpDoc.save();
        return otp;
    }

    async verifyOtp(userId, otp) {
        const otpRecord = await OtpModel.findOne({ userId, otp });
        if (otpRecord) {
            // await OtpModel.deleteOne({ userId, otp }); // Remove OTP after verification
            return true;
        }
        return false;
    }

    async resetPassword(userId, hashedPassword) {
        // Update the user's password in the database
        await UserModel.updateOne({ _id: userId }, { password: hashedPassword });
    }
}