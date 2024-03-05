import Link from "next/link";
import { FaTasks } from "react-icons/fa";
import { CgNotes, CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { TbMessageChatbot } from "react-icons/tb";
import { FaRobot } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { MdQuestionMark } from "react-icons/md";
import clsx from "clsx";

export default function Sidebar({ activeIcon }) {
    return (
        <>
            <div
                className={clsx(
                    "fixed flex flex-row sm:flex-col items-center justify-between w-[100vw] sm:w-[97px] sm:h-[100vh] py-[12px] sm:py-0 px-[23px] sm:px-0 z-20",
                    activeIcon == "documents" ? "bg-orange-600 " : "bg-red-600"
                )}
            >
                <div className="flex flex-row sm:flex-col items-center sm:items-start justify-start gap-[20px] sm:mt-[30px]">
                    <Link href="/chatbot">
                        <div
                            className={`text-[24px] sm:text-[32px] transition-all ease-in-out duration-200 hover:scale-110 rounded-lg p-[8px] sm:p-[15px] cursor-pointer
                        ${activeIcon === "chatbot" ? "bg-red-900" : "hover:bg-red-800 active:bg-red-800"}`}
                        >
                            <TbMessageChatbot color="white" />
                        </div>
                    </Link>
                    <Link href="/documents">
                        <div
                            className={`text-[24px] sm:text-[30px] transition-all ease-in-out duration-200 hover:scale-110 rounded-lg p-[8px] sm:p-[15px] cursor-pointer
                        ${activeIcon === "documents" ? "bg-red-900" : "hover:bg-red-800 active:bg-red-800"}`}
                        >
                            <CgNotes color="white" />
                        </div>
                    </Link>
                    <Link href="/faq">
                        <div
                            className={`text-[24px] sm:text-[30px] transition-all ease-in-out duration-200 hover:scale-110 rounded-lg p-[8px] sm:p-[15px] cursor-pointer
                        ${activeIcon === "faq" ? "bg-red-900" : "hover:bg-red-800 active:bg-red-800"}`}
                        >
                            <MdQuestionMark color="white" />
                        </div>
                    </Link>
                    <Link href="/admin-dashboard">
                        <div
                            className={`text-[24px] sm:text-[30px] transition-all ease-in-out duration-200 hover:scale-110 rounded-lg p-[8px] sm:p-[15px] cursor-pointer
                        ${activeIcon === "admin-dashboard" ? "bg-red-900" : "hover:bg-red-800 active:bg-red-800"}`}
                        >
                            <CgProfile color="white" />
                        </div>
                    </Link>
                </div>
                <div className="text-[24px] sm:text-[30px] hover:bg-red-800 active:bg-red-900 transition-all ease-in-out duration-300 hover:scale-110 rounded-lg p-[8px] sm:p-[15px] cursor-pointer sm:mb-[30px]">
                    <TbLogout2 color="white" />
                </div>
            </div>
        </>
    );
}
