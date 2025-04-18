import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import FaEye from "../assets/eye.svg";
import FaEyeSlash from "../assets/eye-closed.svg";

interface PasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
  label: string;
  className?: string;
}

export default function PasswordInput({
  password,
  setPassword,
  label,
  className = "",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Label htmlFor="password">{label}</Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          className={`mt-1 pr-10 ${className}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <img
          className="absolute right-3 top-4 text-gray-500 cursor-pointer"
          src={showPassword ? FaEye : FaEyeSlash}
          alt="Toggle visibility"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      </div>
    </div>
  );
}
