import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import axios from "axios";

const GoogleSignInButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        console.log("Google user info:", res.data);
        setUserEmail(res.data.email);
        setIsModalOpen(true);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <>
      <button
        onClick={() => login()}
        className="flex items-center gap-4 w-full max-w-md mx-auto px-6 py-3 rounded-2xl bg-[#1C1C22] border border-[#2A2A33] text-white hover:bg-[#2A2A33] transition-colors align-middle justify-center"
      >
        <FcGoogle size={24} />
        <span className="text-lg font-medium">Sign In with Google</span>
      </button>

      {/* ✅ Modal Integration */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sign in Successful!"
        description={`${userEmail} is signed in using Gmail successfully.`}
        buttonText="Got it"
      />
    </>
  );
};

export default GoogleSignInButton;
