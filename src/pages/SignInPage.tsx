import AuthLayout from "../layouts/AuthLayout";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import GoogleSignInButton from "../components/GoogleSignInButton";
import MicrosoftSignInButton from "../components/MicrosoftSignInButton";
import { useNavigate } from "react-router-dom";
import { SignupButton } from "./SignUpPage";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import { checkPasswordForEmail } from "../utils/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const rememberFlag = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && rememberFlag) {
      setEmail(savedEmail);
      setRemember(true);
    } else {
      setRemember(false);
    }
  }, []);

  const handleSignIn = () => {
    if (remember) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberMe");
    }

    const isCorrect = checkPasswordForEmail(email, password);

    if (isCorrect) {
      setModalTitle("Login Success");
      setModalDescription("You have logged in successfully!");
    } else {
      setModalTitle("Incorrect Password");
      setModalDescription(
        "The password you entered is incorrect or email is not registered."
      );
    }

    setModalOpen(true);
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold mb-2">Sign In</h2>
      <p className="mb-6 text-sm text-gray-400">
        Manage your workspace seamlessly. Sign in to continue.
      </p>

      <div className="space-y-4">
        <EmailInput email={email} setEmail={setEmail} />

        <PasswordInput
          label="Password"
          password={password}
          setPassword={setPassword}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={remember}
              onChange={() => setRemember((prev) => !prev)}
            />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
          <button
            onClick={() => navigate("/reset-pass")}
            className="text-sm text-purple-400 hover:underline bg-transparent p-0 border-none focus:outline-none focus:ring-0"
          >
            Forgot Password?
          </button>
        </div>

        <Button className="w-full hover:bg-purple-700" onClick={handleSignIn}>
          Sign In
        </Button>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-600" />
          <span className="px-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-600" />
        </div>
        <GoogleSignInButton />
        <MicrosoftSignInButton />

        <SignupButton />
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        description={modalDescription}
      />
    </AuthLayout>
  );
}
