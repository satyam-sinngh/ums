import express, { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../../database/models/User.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../../lib/email/methods/sendVerificationMail.js";
import { config } from "dotenv";
config();
const router = Router();
router.use(express.json());
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: `Incomplete Request`, success: false });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Invalid Email Format", success: false });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: `User Already Exists`, success: false });
    }
    const hash = await bcrypt.hash(password, 10);
    const payload = {
      email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });

    await sendMail({
      name,
      email,
      token,
    });

    const newUser = await User.create({
      name,
      email,
      password: hash,
      verificationToken: token,
      verificationTokenExpiry: new Date(Date.now() + 3600 * 1000),
    });

    return res.status(201).json({
      message: `User Registered Successfully`,
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(`Failed to Register User`, error);
    return res.status(500).json({ error: `Internal Server Error` });
  }
});

export default router;
