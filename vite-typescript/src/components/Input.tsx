// src/components/Input.tsx
import React from "react";

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary";
type InputType = "text" | "email" | "password" | "tel" | "number" | "search";

interface InputProps {
  size: SizeType;
  color: ColorType;
  placeholder?: string;
  type?: InputType;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Input = (props: InputProps) => {
  const { 
    size, 
    color, 
    placeholder, 
    type = "text",
    name,
    value,
    onChange,
    onBlur,
    disabled = false,
    required = false,
    className = ""
  } = props;
  
  const defaultClass = "flex items-center rounded-2 h-[40px] w-full px-4 py-2 outline-none transition-all duration-200";
  
  const classes = {
    colors: {
      primary: "bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-gray-600",
      secondary: "bg-blue-950 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-300 focus:bg-blue-900",
    },
    sizes: {
      small: "rounded-[100px] text-sm h-[30px]",
      middle: "rounded-[14px] text-base h-[40px]",
      large: "rounded-[15px] text-lg h-[56px] min-h-[56px]",
    },
  };
  
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={`${defaultClass} ${classes.sizes[size]} ${classes.colors[color]} ${disabledClass} ${className}`}
    />
  );
};