import nodemailer from "nodemailer";

console.log(`credentials: `, process.env.EMAIL_USER, process.env.EMAIL_PASS);


export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth:{
    type:"login",
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
});

