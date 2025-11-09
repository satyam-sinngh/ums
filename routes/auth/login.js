import express from "express";
import bodyParser from "body-parser";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;

    if (!email || !password)
      return res.status(400).json({ error: `Incomplete Data`, success: false });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: `Invalid Email`, success: false });
    }

    const userExists = await User.findOne({ email });
    if (!userExists)
      return res.status(404).json({ error: `User not found`, success: false });

    const isValid = await bcryptjs.compare(password, userExists.password);
    if (!isValid)
      return res
        .status(401)
        .json({ error: `Invalid Credentials`, success: false });

    if (!userExists.isVerified)
      return res
        .status(403)
        .json({ error: `Email not Verified`, success: false });

    if (userExists.isBlocked)
      return res.status(403).json({
        error: `You are blocked from the platform please contact support`,
        success: false,
      });

    const token = jwt.sign(
      {
        id: userExists._id,
        email: userExists.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: `Logged in successfully`,
      success: true,
      user: {
        id: userExists._id,
        name: userExists.name,
        email: userExists.email,
      },
      token
    });
  } catch (error) {
    console.log(`Faied to login`, error);
    return res
      .status(500)
      .json({ error: `Internal Srtver Error`, success: false });
  }
});

export default router;
