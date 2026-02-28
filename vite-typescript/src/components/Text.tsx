import React from "react";

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary";

interface TextProps {
  size: SizeType;
  color: ColorType;
  title: string;
  children?: React.JSX.Element;
}

export const Button = (props: TextProps) => {
  const { size, color, title} = props;
  const defaultClass =
    "flex items-center h-[40px] w-[max-content] px-4 py-2 cursor-pointer rounded-[14px]";

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
      small: "text-sm",
      middle: "text-base",
      large: "text-lg",
    },
  };
  return (
    <div
      className={
        defaultClass +
        " " +
        classes.colors[color].button
      }
    >
      <a className={classes.colors[color].text + " " + classes.sizes[size]}>{title}</a>
    </div>
  );
};