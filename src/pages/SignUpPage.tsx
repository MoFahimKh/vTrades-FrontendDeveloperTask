// src/pages/SignUpPage.tsx
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "../components/GoogleSignInButton";
import MicrosoftSignInButton from "../components/MicrosoftSignInButton";
import PasswordInput from "../components/PasswordInput";
import { Button } from "../components/ui/button";
import { useMemo, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import EmailInput from "../components/EmailInput";
import AuthLayout from "../layouts/AuthLayout";

export const SignupButton = () => {
  const navigate = useNavigate();
  return (
    <p className="text-center text-sm text-gray-400 mt-6">
      Don’t have an account?{" "}
      <button
        className="text-sm text-purple-400 hover:underline bg-transparent p-0 border-none focus:outline-none focus:ring-0"
        onClick={() => navigate("/sign-up")}
      >
        Sign Up
      </button>
    </p>
  );
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = password === confirmPassword;
  const allFieldsFilled = useMemo(() => {
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== ""
    );
  }, [email, password, confirmPassword]);

  const handleSignUp = () => {
    console.log("Sending OTP to:", email);

    const encodedPassword = btoa(password); // Base64 encode password

    // Save password per email
    const userPassMap = JSON.parse(
      localStorage.getItem("user_pass_map") || "{}"
    );
    userPassMap[email] = encodedPassword;
    localStorage.setItem("user_pass_map", JSON.stringify(userPassMap));

    // Navigate to OTP verification page
    navigate("/verify-otp", {
      state: { email },
    });
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold mb-2">Sign Up</h2>
      <p className="mb-6 text-sm text-gray-400">
        Manage your workspace seamlessly. Sign up to continue.
      </p>

      <div className="space-y-4">
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput
          label="Password"
          password={password}
          setPassword={setPassword}
        />
        <div>
          <PasswordInput
            label="Confirm Password"
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
      </div>

      <Button
        style={
          !allFieldsFilled || !passwordsMatch ? { cursor: "not-allowed" } : {}
        }
        className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
        onClick={handleSignUp}
        disabled={!allFieldsFilled || !passwordsMatch}
      >
        Sign Up
      </Button>

      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-700" />
        <span className="text-gray-400 px-3 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-700" />
      </div>

      <div className="flex flex-col gap-6">
        <GoogleSignInButton />
        <MicrosoftSignInButton />
      </div>

      <p className="text-sm text-center text-gray-400 mt-6">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/")}
          className="text-purple-400 hover:underline"
        >
          Sign In
        </button>
      </p>
    </AuthLayout>
  );
}
