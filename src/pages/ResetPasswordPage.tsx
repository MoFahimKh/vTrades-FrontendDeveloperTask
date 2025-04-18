import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "../components/EmailInput";
import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/ui/button";
import Modal from "../components/Modal";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Just open modal, OTP will be sent in VerifyOtpPage
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/verify-otp", {
      state: { email, redirectTo: "/create-new-pass" },
    });
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold mb-2 mt-[150px]">
        Forgot Your Password?
      </h2>
      <p className="mt-3 mb-6 text-sm text-gray-400 w-[430px]">
        Don’t worry! Enter your email address, and we’ll send you a link to
        reset it.
      </p>

      <div className="space-y-4 mt-4 ">
        <EmailInput email={email} setEmail={setEmail} />

        <Button className="w-[430px] mt-6" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Link Sent Successfully!"
        description="Check your inbox! We’ve sent you an email with instructions to reset your password."
        buttonText="Okay"
      />
    </AuthLayout>
  );
}
