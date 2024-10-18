import { FC, ReactNode } from "react";

interface ButtonProps {
  variant?: "default" | "secondary" | "outline" | "destructive";
  type?: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const buttonVariants = {
  default: "bg-blue-500 text-background",
  secondary: "bg-gray-700 text-background",
  outline: "border-2 border-blue-500 text-blue-500 bg-transparent",
  destructive: "bg-red-700 text-background",
};

const Button: FC<ButtonProps> = ({
  variant = "default",
  children,
  onClick,
  className = "",
  type = undefined,
  disabled = false,
}) => {
  return (
    <button
      className={`px-4 py-2 self-start font-bold rounded-lg hover:opacity-85 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed ${buttonVariants[variant]} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
