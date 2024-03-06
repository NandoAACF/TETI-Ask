import clsx from "clsx";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function FAQItem({
    question = "Apa saja syarat melakukan seminar kerja praktik?",
    answer = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum.",
}) {
    const [expand, setExpand] = useState(false);
    const handleExpand = () => {
        setExpand(!expand);
    };
    return (
        <div className="flex flex-col items-start justify-start w-[90%] relative cursor-pointer" onClick={handleExpand}>
            <div className="flex flex-row items-center justify-between w-full">
                <h4 className="text-[20px] font-semibold">{question}</h4>
                <IoIosArrowDown
                    className={clsx(
                        "text-[30px] text-black cursor-pointer transition duration-[600ms]",
                        expand ? "rotate-[-180deg]" : ""
                    )}
                />
            </div>
            {expand == true && <h4 className="text-[15px] mt-[8px]">{answer}</h4>}
            <div className="bg-orange-600 w-full h-[3px] mt-[13px]"></div>
        </div>
    );
}
