// src/components/Button.tsx
import React from "react";

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary";

interface ButtonProps {
  size: SizeType;
  color: ColorType;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { size, color, title, onClick, disabled = false, type = "button" } = props;
  
  const defaultClass = "flex items-center justify-center rounded-2 h-[40px] w-[max-content] px-4 py-2 cursor-pointer transition-all duration-200 font-medium";
  
  const classes = {
    colors: {
      primary: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        disabled: "bg-blue-300 text-gray-100 cursor-not-allowed"
      },
      secondary: {
        default: "bg-gray-500 text-white hover:bg-gray-600",
        disabled: "bg-gray-300 text-gray-100 cursor-not-allowed"
      }
    },
    sizes: {
      small: "rounded-[100px] text-sm px-3 py-1 h-[30px]",
      middle: "rounded-[14px] text-base px-4 py-2 h-[40px]",
      large: "rounded-[15px] text-lg px-6 py-3 h-[56px]"
    }
  };
  
  const colorClass = disabled ? classes.colors[color].disabled : classes.colors[color].default;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${defaultClass} ${classes.sizes[size]} ${colorClass}`}
    >
      {title}
    </button>
  );
};