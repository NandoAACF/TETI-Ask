import { useMemo } from "react";
import Text from "../components/Text";
import clsx from "clsx";

// Contoh Penggunaan
// <Button
//     text="Kembalii"
//     color="blue"
//     size="sm"
//     type="primary"
// >
// </Button>

export default function Button({
    StartIcon,
    text = "Button",
    EndIcon,
    color = "blue",
    size = "sm",
    type = "primary",
    isSubmit = "",
    onClick = () => {},
    className,
    disabled,
}) {
    // hover:shadow-[0_4px_8px_rgba(249, 156, 16, 0.21)]
    const btnColor = useMemo(() => {
        if (type === "primary")
            return `text-white bg-red-600 hover:bg-red-700 active:bg-red-800 hover:shadow-lg hover:shadow-red-700/[29%] hover:-translate-y-[6px]`;
        if (type === "primary2")
            return `text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 hover:shadow-lg hover:shadow-orange-700/[29%] hover:-translate-y-[6px]`;
        if (type === "login")
            return `text-white bg-red-600 hover:bg-red-700 active:bg-red-800 hover:shadow-lg hover:shadow-red-700/[29%] hover:-translate-y-[6px]`;
        if (type === "secondary")
            return `text-black bg-transparant hover:text-white hover:bg-red-600 active:bg-red-800 hover:shadow-lg hover:shadow-red-700/[29%] hover:-translate-y-[6px]`;
        if (type === "secondary2")
            return `text-black bg-transparant hover:text-white hover:bg-orange-600 active:bg-orange-800 hover:shadow-lg hover:shadow-orange-700/[29%] hover:-translate-y-[6px]`;
        if (type == "resetpassword")
            return `text-white bg-red-500 hover:bg-red-600 active:bg-red-700 hover:shadow-lg hover:shadow-red-500/[29%] hover:-translate-y-[6px]`;
        if (type == "disabled")
            return `bg-gradient-to-b from-[#6F6B3C] to-[#695435] cursor-not-allowed text-[#3F3C48] pointer-events-none`;
        if (type == "resetfilter")
            return `text-[#2984C9] bg-slate-100 hover:bg-slate-200 active:bg-slate-300 hover:shadow-lg hover:shadow-[#2471AB]/[29%] hover:-translate-y-[6px]`;
        if (type == "disabledsecondary")
            return `bg-transparant ring-[2px] ring-white ring-inset text-white ring-opacity-60 text-[#747680] cursor-not-allowed pointer-events-none`;
        if (type == "logout") return `bg-[#878888] text-white hover:bg-black`;
    }, [color, type]);

    const fontSize = useMemo(() => {
        return {
            xsm: `text-sm px-5 py-1.5 gap-2.5`,
            sm: `text-[15px] px-[24px] py-[10px] gap-2.5`,
            md: `text-[18px] px-[24px] py-[15px] gap-3.5`,
            lg: `text-[18px] px-[24px] py-[19px] gap-4`,
        }[size];
    }, [size]);

    return (
        <button
            type={isSubmit}
            onClick={onClick}
            className={clsx(
                "transition-all rounded-[8px] font-bold ease-in-out duration-200 flex justify-center items-center ",
                size === "sm" && type === "secondary" ? "font-bold" : "",
                btnColor,
                fontSize,
                className
            )}
            disabled={disabled}
        >
            <Text
                StartIcon={StartIcon}
                value={text}
                EndIcon={EndIcon}
                startClassName={clsx(
                    "-mr-[4.1px]",
                    size === "sm" ? "w-7 h-7" : size === "md" ? "w-8 h-8" : size === "lg" ? "w-9 h-9" : ""
                )}
                endClassName={clsx(
                    "-ml-[2.1px]",
                    size === "sm" ? "w-7 h-7" : size === "md" ? "w-8 h-8" : size === "lg" ? "w-9 h-9" : ""
                )}
            />
        </button>
    );
}
