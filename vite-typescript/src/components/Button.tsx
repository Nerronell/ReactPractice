import React from "react";

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary";

interface ButtonProps{
    size: SizeType;
    color: ColorType;
    title: string;
    onClick: () => void;
    children?: React.JSX.Element;
}
export const Button = (props: ButtonProps) =>{
    const{size,color,title,onClick} =props;
    const defaultClass = "flex items-center rounded-2 h-[40px] w-[max-content] px-4 py-2 cursor-pointer";

    const classes = {
        colors: {
            primary: {
                button: "bg-gray-700",
                text: "text-black",
            },
            secondary: {
                button: "bg-black-500",
                text: "text-white",
            },
        },
        sizes: {
            small:"rounded-[100px] font-sm",
            middle:"rounded-[14px] font-base",
            large: "rounded-[15px] font-lg min-h-[56px]",
        },
    };
    return (
        <div className={
            defaultClass + " " + classes.sizes[size] + " " + classes.colors[color].button
        }
        onClick={onClick}
        >

            <span className={classes.colors[color].text}>{title}</span>
        </div>
    )
}