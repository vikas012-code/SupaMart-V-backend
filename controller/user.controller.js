import Users from "../models/users.model.js";

import nodemailer from 'nodemailer';
import crypto from 'node:crypto';
import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_USER_EMAIL,
} = process.env;

async function sendMail(to, otp) {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !GOOGLE_USER_EMAIL) {
  throw new Error("Missing Gmail OAuth2 env vars");
}

const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

function base64Encode(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}


  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  const rawMessage = `From: ${GOOGLE_USER_EMAIL}
To: ${to}
Subject: Your OTP Code
Content-Type: text/plain; charset="UTF-8"

Your OTP code is: ${otp}`;

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: base64Encode(rawMessage),
    },
  });

  return res.data;

}

export async function GetAllUsers(req ,res) {
    const AllUsers=await Users.find({})
    res.json(AllUsers)
}

export async function GetUsersById(req ,res) {
  const _id= req.params.id;
  try{
        const UsersDetail=await Users.findById(_id)
        res.status(200).json(UsersDetail)
    }
    catch(err){
      console.log(err)
      res.status(500).json(err);
    }
}

export async function GetUserByEmail(req ,res) {
  const email = req.params.email;
   try{
        const UsersDetail=await Users.find({email:email})
        res.status(200).json(UsersDetail)
    }
    catch(err){
      console.log(err)
      res.status(500).json(err);
    }
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
// const transporter = nodemailer.createTransport({

//     host: "smtp.gmail.com",
//     port: 587,
//     secure: true,
//     auth: {
//         user: process.env.NodeMailer_Gmail,
//         pass: process.env.NodeMailer_Password,
//     },

// });

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

        try {
            // await transporter.sendMail({
            // from:process.env.NodeMailer_Gmail ,
            // to: email,
            // subject: 'Resend OTP Verification',
            // text: `Your new OTP is: ${otp}`
            // });

            const result = await sendMail(email, otp);
            console.log("OTP sent! Message ID: ", result.id)

            } catch (err) {
            console.error("FULL ERROR:", err);
            console.error("ERR TEXT:", err?.response?.toString?.());
            res.status(500).json({error:err})
            }

        res.status(200).json({ message: 'OTP resent successfully.' });
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
