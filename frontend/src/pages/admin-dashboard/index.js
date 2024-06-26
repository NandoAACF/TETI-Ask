import CardDocumentAdmin from "@/components/CardDocumentAdmin";
import { RiAddCircleFill } from "react-icons/ri";
import { useState } from "react";
import ModalDocument from "@/components/ModalDocument";
import Sidebar from "@/components/Sidebar";
import { useGetUnverifiedDocument } from "@/services/document";
import { useProtectedRoute } from "@/services/admin";
import Link from "next/link";
import Head from "next/head";
import SelectDocumentCategory from "@/components/DocumentCategory";

export default function AdminDashboad() {
    useProtectedRoute();
    const [modal, setModal] = useState(false);
    const docs = useGetUnverifiedDocument();
    const handleExit = () => {
        setModal(false);
    };
    const handleCategory = (e) => {
        docs.setCategory(e.target.value);
    };
    return (
        <>
            <Head>
                <title>Admin Documents - TETI Ask</title>
            </Head>
            <Sidebar activeIcon="admin-dashboard" />
            <div className="flex flex-col justify-start min-h-screen bg-slate-50 pt-[80px] sm:pt-[30px] pb-[30px] pr-[40px] sm:pr-[50px] pl-[40px] sm:pl-[153px] body">
                <h3 className="text-[34px] sm:text-[40px] font-bold text-left">Admin Dashboard</h3>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-start mt-[20px] gap-x-[20px] gap-y-[20px] md:gap-x-[35px] md:gap-y-[25px] md:flex-wrap">
                    <div className="flex flex-row items-center justify-start gap-[15px]">
                        <h4 className="text-[17px] font-medium text-left">Category:</h4>
                        <SelectDocumentCategory categories={docs.categories} handleCategory={handleCategory} />
                    </div>
                    <Link
                        className="px-[20px] py-[5px] rounded-lg bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all ease-in-out duration-300 text-center font-semibold hover:shadow-lg hover:shadow-red-700/[29%]"
                        href="/register"
                    >
                        Add Admin
                    </Link>
                </div>
                <img
                    className={`mx-auto mt-8 ${!docs.loading && "hidden"}`}
                    src="/assets/images/loading.gif"
                    alt="loading"
                    width={80}
                />
                <div className="flex flex-row items-center justify-start mt-[30px] flex-wrap gap-[40px]">
                    {docs.data.map((doc) => (
                        <CardDocumentAdmin
                            id={doc._id.$oid}
                            key={doc._id.$oid}
                            title={doc.title}
                            category={doc.category}
                            date={doc.date}
                            description={doc.description}
                            link={doc.link}
                            refetch={docs.refetch}
                        />
                    ))}
                    {/* <CardDocumentAdmin
                        title="Buku Panduan"
                        category="Akademik"
                        date="14 Februari 2024"
                        description="Dokumen ini berisi panduan untuk kegiatan akademik"
                        link="https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing"
                    />
                    <CardDocumentAdmin
                        title="Buku Panduan"
                        category="Akademik"
                        date="14 Februari 2024"
                        description="Dokumen ini berisi panduan untuk kegiatan akademik"
                        link="https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing"
                    /> */}
                </div>
            </div>
            <div
                className="fixed right-[50px] bottom-[40px] text-[60px] sm:text-[90px] text-black hover:text-red-700 active:text-red-800 transition-all ease-in-out duration-200 cursor-pointer hover:scale-110"
                onClick={() => {
                    setModal(true);
                }}
            >
                <RiAddCircleFill />
            </div>
            {modal && <ModalDocument handleExit={handleExit} refetch={docs.refetch} />}
        </>
    );
}
