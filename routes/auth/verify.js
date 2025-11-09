import express from "express";
import User from "../../database/models/User.js";

const router = express.Router();

router.post("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    if (!token)
      return res
        .status(400)
        .json({ error: `Token not provided`, success: false });

    const userExists = await User.findOne({ verificationToken: token });
    if (!userExists)
      return res.status(404).json({ error: `Invalid link`, success: false });

    if (userExists.verificationTokenExpiry < Date.now())
      return res.status(401).json({ error: `Link Expired`, success: false });

    await User.findOneAndUpdate(
      {
        verificationToken: token,
      },
      {
        isVerified: true,
      }
    );

    return res.status(200).json({ message: `Email Verified`, success: true });

    return res.status(200).json(token);
  } catch (error) {
    console.log(`Error Verifying Email`, error);
    return res
      .status(500)
      .json({ error: `Internal Server Error`, success: false });
  }
});

export default router;
