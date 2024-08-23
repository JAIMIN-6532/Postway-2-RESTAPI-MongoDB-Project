import OtpRepository from "./otp.repository.js";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

export default class OtpController {
    constructor() {
        this.OtpRepository = new OtpRepository();
    }

    async sendOtp(req, res, next) {
        try {
            const { email} = req.body;
            const userId = req.userID;
            const otp = await this.OtpRepository.sendOtp(userId);

            // Configure Nodemailer
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER, // Your Gmail address
                    pass: process.env.EMAIL_PASS  // Your Gmail password
                }
            });

            // Send OTP via email
            let info = await transporter.sendMail({
                from: 'jaimin12prajapati@gmail.com', // Sender address
                to: email, // Receiver email
                subject: "Your OTP Code", // Subject line
                text: `Your OTP is ${otp}` // Plain text body
            });

            res.status(200).json({ message: 'OTP sent successfully!' });
        } catch (err) {
            next(err);
        }
    }

    async verifyOtp(req, res, next) {
        try {
            const {  otp } = req.body;
            const userId = req.userID;
            const isValid = await this.OtpRepository.verifyOtp(userId, otp);
            if (isValid) {
                res.status(200).json({ message: 'OTP verified successfully!' });
            } else {
                res.status(400).json({ message: 'Invalid OTP!' });
            }
        } catch (err) {
            next(err);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const {  otp, newPassword } = req.body;
            const userId = req.userID;
            // First, verify the OTP
            const isValidOtp = await this.OtpRepository.verifyOtp(userId, otp);
            if (!isValidOtp) {
                return res.status(400).json({ message: 'Invalid or expired OTP!' });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password
            await this.OtpRepository.resetPassword(userId, hashedPassword);

            res.status(200).json({ message: 'Password reset successfully!' });
        } catch (err) {
            next(err);
        }
    
    }
}