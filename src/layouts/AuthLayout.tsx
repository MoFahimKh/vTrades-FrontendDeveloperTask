import BgIcon from "../assets/bg.svg";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex overflow-hidden w-full">
      {/* Left Side - Image and Info */}
      <img
        style={{ width: "720px" }}
        src={BgIcon}
        alt="Team working"
        className="mb-6 rounded-lg h-[760px]"
      />

      {/* Right Side - Dynamic Content */}
      <div className="ml-10 p-10">{children}</div>
    </div>
  );
}
