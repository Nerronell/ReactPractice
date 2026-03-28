import React from "react";

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary";

interface InputProps{
    size: SizeType;
    color: ColorType;
    placeholder: string;
    children?: React.JSX.Element;
}
export const Input = (props: InputProps) =>{
    const{size,color,placeholder} =props;
    const defaultClass = "flex items-center rounded-2 h-[40px] w-[max-content] px-4 py-2 cursor-pointer";

    const classes = {
        colors: {
            primary: "bg-gray-700 text-black",
            secondary: "bg-blue-950 text-white",
        },
        sizes: {
            small:"rounded-[100px] font-sm",
            middle:"rounded-[14px] font-base",
            large: "rounded-[15px] font-lg min-h-[56px]",
        },
    };
    return (
        <input 
        placeholder={placeholder}
        className={defaultClass + " " + classes.sizes[size] + " " + classes.colors[color]}
        >
        </input>
    )
}