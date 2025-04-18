import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_7biu5og";
const TEMPLATE_ID = "template_h3ysym7";
const PUBLIC_KEY = "st7NqCz0UnVBj0VMK";

export const sendOtpToEmail = async (email: string): Promise<string> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const templateParams = {
    email,
    otp,
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log("OTP sent to email:", email);
    return otp;
  } catch (err) {
    console.error("Failed to send OTP", err);
    throw new Error("Failed to send OTP. Try again.");
  }
};
