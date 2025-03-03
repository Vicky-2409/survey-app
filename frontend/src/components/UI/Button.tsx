import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
  size = "md",
  fullWidth = false,
  icon,
  iconPosition = "left",
}) => {
  // Base styles for all buttons
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Size variations
  const sizeClasses = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-2.5 px-5",
  };

  // Variant styles with more subtle, modern color schemes
  const variantClasses = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-md hover:shadow-lg",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 focus:ring-gray-400 hover:text-gray-900",
    danger:
      "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-md hover:shadow-lg",
  };

  // Disabled state - more subtle approach
  const disabledClasses = disabled
    ? "opacity-60 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  // Full width option
  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${widthClasses} ${className}`}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
