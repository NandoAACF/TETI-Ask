import { deleteFAQ } from "@/services/faqs";
import clsx from "clsx";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

export default function FAQItem({
    id,
    question = "Apa saja syarat melakukan seminar kerja praktik?",
    answer = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum.",
    loggedIn = false,
    refetch,
    handleEdit,
}) {
    const [expand, setExpand] = useState(false);
    const handleExpand = () => {
        setExpand(!expand);
    };
    const handleDeleteFAQ = async () => {
        try {
            const res = await deleteFAQ(id);
            refetch();
            toast.success(res.data);
        } catch (error) {
            toast.error("Failed to reject document " + error);
        }
    };
    return (
        <div className="flex flex-col items-start justify-start w-[90%] relative">
            <div className="flex flex-row items-center justify-between w-full cursor-pointer" onClick={handleExpand}>
                <h4 className="text-[20px] font-semibold">{question}</h4>
                <IoIosArrowDown
                    className={clsx(
                        "text-[30px] text-black cursor-pointer transition duration-[600ms]",
                        expand ? "rotate-[-180deg]" : ""
                    )}
                />
            </div>
            {expand == true && <h4 className="text-[15px] mt-[8px]">{answer}</h4>}
            {loggedIn && (
                <>
                    <div className="flex flex-row items-center justify-start gap-[10px] mt-[15px] w-full mb-[5px]">
                        <button
                            onClick={handleEdit}
                            className="px-[14px] py-[5px] rounded-lg bg-green-600 text-white hover:bg-green-800 active:bg-green-900 transition-all ease-in-out duration-300 text-center font-semibold hover:shadow-lg hover:shadow-[#2471AB]/[29%] cursor-pointer"
                        >
                            Edit QnA
                        </button>
                        <button
                            onClick={handleDeleteFAQ}
                            className="px-[14px] py-[5px] rounded-lg bg-red-600 text-white hover:bg-red-800 active:bg-red-900 transition-all ease-in-out duration-300 text-center font-semibold hover:shadow-lg hover:shadow-[#2471AB]/[29%] cursor-pointer"
                        >
                            Delete QnA
                        </button>
                    </div>
                </>
            )}
            <div
                className={clsx("bg-orange-600 w-full h-[3px] cursor-pointer", loggedIn ? "mt-[10px]" : "mt-[18px]")}
                onClick={handleExpand}
            ></div>
        </div>
    );
}
