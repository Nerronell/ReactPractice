import React from "react";

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary";

interface ButtonProps {
  size: SizeType;
  color: ColorType;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  children?: React.JSX.Element;
}

export const Button = (props: ButtonProps) => {
  const { size, color, title, onClick, disabled } = props;
  const defaultClass =
    "flex items-center rounded-2 h-[40px] w-[max-content] px-4 py-2 cursor-pointer";

    const disabledClass=disabled
    ? "opacity-50 cursor-not-allowed point-events-none"
    : "cursor-pointer";
  const classes = {
    colors: {
      primary: {
        button: "bg-amber-700",
        text: "text-red",
      },
      secondary: {
        button: "bg-red-500",
        text: "text-white",
      },
    },
    sizes: {
      small: "rounded-[100px] font-sm",
      middle: "rounded-[14px] font-base",
      large: "rounded-[16px] font-base min-h-[56px]",
    },
  };
  const handleClick= (e:React.MouseEvent)=>{
    if (disabled)return;
    onClick();
}
  return (
    <div
      className={
        defaultClass +
        " " +
        classes.sizes[size] +
        " " +
        classes.colors[color].button +
        " " +
        disabledClass
      }
      onClick={handleClick}
    >
      <span className={classes.colors[color].text}>{title}</span>
    </div>
  );
};