import { generateMagicLinkEmail } from "../utils/verificationMail.js";
import { transporter } from "./setup.js";

export const sendMail = async ({ name, email, token }) => {
  try {
    const content = generateMagicLinkEmail({
      userName: name,
      magicLink: `${process.env.HOST}/verify?token=${token}`,
      supportEmail: process.env.EMAIL_USER,
      companyName: `UMS`,
    });

    await transporter.sendMail({
      from: `UMS <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Verify Your account`,
      html: content,
    });
    console.log(`Mail send successfully`);
  } catch (error) {
    console.log(`Failed to send Mail`, error);
    throw new Error(`Failed to send Mail: ${error.message}`);
  }
};
