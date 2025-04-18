/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import MicrosoftLogin from "react-microsoft-login";
import MsIcon from "../assets/ms-icon.svg";
import Modal from "./Modal";

const MicrosoftSignInButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const loginHandler = (error: any, authData: any) => {
    if (error) {
      console.error("Microsoft Login Error:", error);
    } else {
      console.log("Microsoft Login Success:", authData);

      const email =
        authData?.account?.userName || authData?.email || "Unknown email";
      setUserEmail(email);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <MicrosoftLogin
        clientId="f8c7976f-3e93-482d-88a3-62a1133cbbc3"
        authCallback={loginHandler}
        graphScopes={["user.read"]}
        redirectUri="http://localhost:3000"
      >
        <button className="flex items-center gap-4 w-full max-w-md mx-auto px-6 py-3 rounded-2xl bg-[#1C1C22] border border-[#2A2A33] text-white hover:bg-[#2A2A33] transition-colors align-middle justify-center">
          <img src={MsIcon} alt="Microsoft Icon" className="w-6 h-6" />
          <span className="text-lg font-medium">Sign In with Microsoft</span>
        </button>
      </MicrosoftLogin>

      {/* ✅ Modal for successful sign-in */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sign in Successful!"
        description={`${userEmail} is signed in using Microsoft successfully.`}
        buttonText="Got it"
      />
    </>
  );
};

export default MicrosoftSignInButton;
