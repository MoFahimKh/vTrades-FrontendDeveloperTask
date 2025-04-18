import { useMemo, useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { Button } from "../components/ui/button";
import Modal from "../components/Modal";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PasswordInput from "../components/PasswordInput";
import { useNavigate } from "react-router-dom";

export default function CreateNewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = new URLSearchParams(window.location.search).get("email");
  console.log("email", email);
  const navigate = useNavigate();
  const passwordsMatch = password === confirmPassword;
  const allFieldsFilled = useMemo(() => {
    return password.trim() !== "" && confirmPassword.trim() !== "";
  }, [password, confirmPassword]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    const encodedPassword = btoa(password);

    // Retrieve the user-pass map from localStorage
    const userPassMap = JSON.parse(
      localStorage.getItem("user_pass_map") || "{}"
    );

    const email = new URLSearchParams(window.location.search).get("email");
    if (email) {
      // Save the password for the given email
      userPassMap[email] = encodedPassword;
      localStorage.setItem("user_pass_map", JSON.stringify(userPassMap));
    }

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold mb-2 mt-[150px]">
        Create New Password
      </h2>
      <p className="mt-3 mb-6 text-sm text-gray-400 w-[430px]">
        Don’t worry! Enter your email address, and we’ll send you a link to
        reset it.
      </p>

      <div className="space-y-4 mt-4 ">
        <PasswordInput
          className="mb-4"
          label="Password"
          password={password}
          setPassword={setPassword}
        />
        <PasswordInput
          label="Re-enter your new password"
          password={confirmPassword}
          setPassword={setConfirmPassword}
          className={
            !passwordsMatch && confirmPassword ? "border border-red-500" : ""
          }
        />

        {!passwordsMatch && confirmPassword && (
          <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
            <AiOutlineInfoCircle size={20} />
            <span>Oops! Passwords Don’t Match</span>
          </div>
        )}
      </div>
      <Button
        className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
        onClick={handleSubmit}
        disabled={!allFieldsFilled || !passwordsMatch}
      >
        Sign Up
      </Button>

      {/* Success Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Password Created!"
        description="Your password has been successfully updated. You can now use your new password to log in."
        buttonText="Okay"
      />
    </AuthLayout>
  );
}
