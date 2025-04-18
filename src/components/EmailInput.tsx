import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface EmailInputProps {
  email: string;
  setEmail: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (isTouched) {
      setIsValid(emailRegex.test(email));
    }
  }, [email, isTouched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isTouched) setIsTouched(true);
  };

  return (
    <div>
      <Label htmlFor="email">Email Address</Label>
      <Input
        type="email"
        id="email"
        className={`mt-1 ${
          !isValid && isTouched ? "border border-red-500" : ""
        }`}
        value={email}
        onChange={handleChange}
      />
      {!isValid && isTouched && (
        <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
          <AiOutlineInfoCircle size={20} />
          <span>Enter a valid email address</span>
        </div>
      )}
    </div>
  );
};

export default EmailInput;
