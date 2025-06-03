import Users from "../models/users.model.js";

import nodemailer from 'nodemailer';
import crypto from 'node:crypto';

// export async function SaveUser(req ,res) {
//     console.log("/user connected...")

//   const req_Data = req.body;

//   const data = new Users(req_Data);
  
//   try{
//     const result = await data.save();
//     console.log(data)
//     res.status(200).send(data);
//   }
//   catch(err){
//     console.log(err)
//     res.status(500).json(err);
//   }
    
// }

export async function GetAllUsers(req ,res) {
    const AllUsers=await Users.find({})
    res.json(AllUsers)
}

export async function GetUsersById(req ,res) {
  const {_id}= req.body;
  const UsersDetail=await Users.findById(_id)
  res.json(UsersDetail)
}

export async function GetUserByEmail(req ,res) {
  const {email }= req.body;
  const UsersDetail=await Users.find({email:email})
  res.json(UsersDetail)
}

export async function DeleteUserById(req ,res) {
  const {_id}= req.body;
  try{
      const result = await Users.deleteOne({_id:_id});
      console.log(result)
      res.status(200).send(result);
    }
    catch(err){
      console.log(err)
      res.status(500).json(err);
    }
}





// Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NodeMailer_Gmail,
        pass: process.env.NodeMailer_Password
    }
});

// Generate OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Register User and Send OTP
export async  function SaveUser (req, res) {
    try {
        const { name, email, password } = req.body;
        let user = await Users.findOne({ email });

        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new Users({ name, email, password});
        await user.save();

        res.status(201).json({ message: 'User registered.' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// send OTP
export async function sendOTP (req, res) {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await transporter.sendMail({
            from:process.env.NodeMailer_Gmail ,
            to: email,
            subject: 'Resend OTP Verification',
            text: `Your new OTP is: ${otp}`
        });

        res.json({ message: 'OTP resent successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error resending OTP', error });
    }
};


// Verify OTP
export async function verifyOTP (req, res) {
    try {
        const { email, otp } = req.body;
        const user = await Users.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });

        if (user.otp !== otp || user.otpExpiry < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully. You can now change' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
  };
  

// resetpassword
export async function ResetPassword (req, res) {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });

        user.password = password ;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error });
    }
};
