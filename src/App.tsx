import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage"; // Ensure you have this page
import ResetPasswordPage from "./pages/ResetPasswordPage"; // Ensure you have this page

import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import CreateNewPasswordPage from "./pages/CreateNewPasswordPage";

function App() {
  return (
    <GoogleOAuthProvider clientId="306411024046-peug96q6m8ejc93urjjpf6a01nn2m846.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/reset-pass" element={<ResetPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/create-new-pass" element={<CreateNewPasswordPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
