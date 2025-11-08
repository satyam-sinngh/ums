import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../../database/models/User";
import jwt from "jsonwebtoken";
const router = Router();

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
    const newUser = await User.create({
      name,
      email,
      password: hash,
      verificationToken: token,
      verificationTokenExpiry: new Date(Date.now() + 3600 * 1000),
    });

    // TODO: Send mail to the user to validate thier mail

    return res.status(201).json({
      message: `User Registered Successfully`,
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(`Failed to Register User`, error);
    return res.json({ error: `Internal Server Error` }).status(500);
  }
});
