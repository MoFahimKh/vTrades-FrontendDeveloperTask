/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import AuthLayout from "../layouts/AuthLayout";
import Modal from "../components/Modal";
import { sendOtpToEmail } from "../utils/sendOtpToEmail";

export default function VerifyOtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {
    email: "companyadmin@gmail.com",
    redirectTo: "/",
  };
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const hasSentOtp = useRef(false);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const closeModalAndRedirect = () => {
    setIsModalOpen(false);
    navigate(`/create-new-pass?email=${encodeURIComponent(email)}`);
  };

  const handleResendOtp = () => {
    const newOtp = generateOtp();
    localStorage.setItem("otp", newOtp);
    sendOtpToEmail(newOtp);
    setTimer(30);
    setResendDisabled(true);
  };

  const handleVerify = () => {
    const joinedOtp = otp.join("");
    const storedOtp = localStorage.getItem("otp");

    if (joinedOtp === storedOtp) {
      setIsModalOpen(true);
    } else {
      setError("OTP Mismatch");
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (hasSentOtp.current) return;
    hasSentOtp.current = true;

    const sendInitialOtp = async () => {
      try {
        const generatedOtp: string = await sendOtpToEmail(email);
        localStorage.setItem("otp", generatedOtp);
      } catch (err: any) {
        setError(err.message);
      }
    };

    sendInitialOtp();

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto text-white mt-[150px]">
        <div className="text-[32px] mb-2">Enter OTP</div>
        <p className="text-sm text-gray-300 mb-6">
          Enter the OTP that we have sent to your email address <br />
          <span className="font-medium">{email}</span>
        </p>

        <p
          className="text-sm text-purple-400 mb-4 cursor-pointer hover:underline"
          onClick={() => navigate(-1)}
        >
          Change Email Address
        </p>

        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              placeholder="0"
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el: any) => {
                inputsRef.current[index] = el;
              }}
              className="w-12 h-12 text-center text-lg font-semibold rounded-md bg-[#1e1e1e] border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ))}
        </div>

        {/* Timer and resend */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {timer > 0 ? `${timer} sec` : "Expired"}
          </div>

          <button
            onClick={handleResendOtp}
            disabled={resendDisabled}
            className={`text-purple-400 hover:underline ${
              resendDisabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            Resend OTP
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button
          onClick={handleVerify}
          className="w-full py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-lg rounded-xl transition-colors"
        >
          Continue
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModalAndRedirect}
        title="OTP Verified Successfully!"
        description="Your OTP is been verified and you have succesfully registered your email."
      />
    </AuthLayout>
  );
}
