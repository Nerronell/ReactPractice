import React from "react";

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary";

interface TextProps{
    size: SizeType;
    color: ColorType;
    title: string;
    children?: React.JSX.Element;
}
export const Text = (props: TextProps) =>{
    const{size,color,title} =props;
    const defaultClass = "flex items-center rounded-2 h-[40px] w-[max-content] px-4 py-2 cursor-pointer";

    const classes = {
        colors: {
            primary: {
                box: "bg-gray-700",
                text: "text-black",
            },
            secondary: {
                box: "bg-black-500",
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
            defaultClass + " " + classes.sizes[size] + " " + classes.colors[color].box
        }
        >

            <p className={classes.colors[color].text}>{title}</p>
        </div>
    )
}