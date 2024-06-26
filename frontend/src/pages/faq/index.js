import CardDocumentAdmin from "@/components/CardDocumentAdmin";
import { RiAddCircleFill } from "react-icons/ri";
import { useState } from "react";
import ModalDocument from "@/components/ModalDocument";
import Sidebar from "@/components/Sidebar";
import { IoIosArrowDown } from "react-icons/io";
import FAQItem from "@/components/FAQItem";
import ModalFAQ from "@/components/ModalFAQ";
import { useGetVerifiedFaqs } from "@/services/faqs";
import { useAdmin } from "@/services/admin";
import ModalEditFAQ from "@/components/ModalEditFAQ";
import Head from "next/head";
import SelectFaqCategory from "@/components/FaqCategory";

export default function FAQ() {
    const [modal, setModal] = useState(false);
    const [editIdx, setEditIdx] = useState(null);
    const faqs = useGetVerifiedFaqs();
    const admin = useAdmin();
    const handleExit = () => {
        setModal(false);
    };
    const handleCategory = (e) => {
        faqs.setCategory(e.target.value);
    };
    const handleSearch = (e) => {
        faqs.setSearch(e.target.value);
    };
    const handleEdit = (id) => () => {
        setEditIdx(id);
    };
    const handleExitEdit = () => {
        setEditIdx(null);
    };
    return (
        <>
            <Head>
                <title>FAQ - TETI Ask</title>
            </Head>
            <Sidebar activeIcon="faq" />
            <div className="flex flex-col justify-start min-h-screen bg-slate-50 pt-[80px] sm:pt-[30px] pb-[30px] pr-[27px] sm:pr-[50px] pl-[40px] sm:pl-[153px] body">
                <h3 className="text-[34px] sm:text-[40px] font-bold text-left">FAQ</h3>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-start mt-[20px] gap-x-[20px] gap-y-[20px] md:gap-x-[35px] md:gap-y-[25px] md:flex-wrap">
                    <div className="flex flex-row items-center justify-start gap-[15px]">
                        <h4 className="text-[17px] font-medium text-left">Category:</h4>
                        <SelectFaqCategory handleCategory={handleCategory} categories={faqs.categories} />
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[15px]">
                        <h4 className="text-[17px] font-medium text-left">Search:</h4>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Keyword"
                            className="border-[1px] border-slate-300 rounded-[10px] w-[145px] sm:w-[200px] py-[5px] px-[9px] mt-[2px] hover:bg-white outline-none transition-all ease-in-out duration-300 focus:ring-[3px] focus:ring-orange-500"
                        />
                    </div>
                    {/* <a
                        className="px-[20px] py-[5px] rounded-lg bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800 transition-all ease-in-out duration-300 text-center font-semibold hover:shadow-lg hover:shadow-orange-700/[29%]"
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Apply
                    </a> */}
                </div>
                <img
                    className={`mx-auto mt-8 ${!faqs.loading && "hidden"}`}
                    src="/assets/images/loading.gif"
                    alt="loading"
                    width={80}
                />
                <div className="flex flex-col items-start justify-start mt-[30px] gap-[20px] relative">
                    {faqs.data.map((faq, index) => (
                        <FAQItem
                            id={faq._id.$oid}
                            key={faq._id.$oid}
                            question={faq.question}
                            answer={faq.answer}
                            loggedIn={admin.loggedIn}
                            refetch={faqs.refetch}
                            handleEdit={handleEdit(index)}
                        />
                    ))}
                    {/* <FAQItem
                        question="Apa saja syarat melakukan seminar kerja praktik?"
                        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum."
                    />
                    <FAQItem
                        question="Apa saja syarat melakukan seminar kerja praktik?"
                        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum."
                    />
                    <FAQItem
                        question="Apa saja syarat melakukan seminar kerja praktik?"
                        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum."
                    /> */}
                </div>
            </div>
            <div
                className="fixed right-[50px] bottom-[40px] text-[60px] sm:text-[90px] text-black hover:text-orange-700 active:text-orange-800 transition-all ease-in-out duration-200 cursor-pointer hover:scale-110"
                onClick={() => {
                    setModal(true);
                }}
            >
                <RiAddCircleFill />
            </div>
            {modal && <ModalFAQ handleExit={handleExit} />}
            {faqs.data.length && editIdx != null && (
                <ModalEditFAQ handleExit={handleExitEdit} _faq={faqs.data[editIdx]} refetch={faqs.refetch} />
            )}
        </>
    );
}
