import CardDocument from "@/components/CardDocument";
import { RiAddCircleFill } from "react-icons/ri";
import { useState } from "react";
import ModalDocument from "@/components/ModalDocument";
import Sidebar from "@/components/Sidebar";
import { useGetVerifiedDocument } from "@/services/document";
import { useAdmin } from "@/services/admin";

export default function Document() {
    const [modal, setModal] = useState(false);
    const docs = useGetVerifiedDocument();
    const admin = useAdmin();
    const handleExit = () => {
        setModal(false);
    };
    const handleCategory = (e) => {
        docs.setCategory(e.target.value);
    };
    const handleSearch = (e) => {
        docs.setSearch(e.target.value);
    };
    return (
        <>
            <Sidebar activeIcon="documents" />
            <div className="flex flex-col justify-start min-h-screen bg-slate-50 pt-[80px] sm:pt-[30px] pb-[30px] pr-[27px] sm:pr-[50px] pl-[40px] sm:pl-[153px] body">
                <h3 className="text-[40px] font-bold text-left">Documents</h3>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-start mt-[20px] gap-x-[20px] gap-y-[20px] md:gap-x-[35px] md:gap-y-[25px] md:flex-wrap">
                    <div className="flex flex-row items-center justify-start gap-[15px]">
                        <h4 className="text-[17px] font-medium text-left">Category:</h4>
                        <select onChange={handleCategory} className="bg-white border-[1px] border-slate-300 rounded-[10px] w-[125px] sm:w-[150px] py-[5px] px-[7px] mt-[2px] hover:bg-white cursor-pointer outline-none transition-all ease-in-out duration-200">
                            <option value="">All</option>
                            <option value="akademik">Akademik</option>
                            <option value="organisasi">Organisasi</option>
                        </select>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[15px]">
                        <h4 className="text-[17px] font-medium text-left">Search:</h4>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Keyword"
                            className="border-[1px] border-slate-300 rounded-[10px] w-[145px] sm:w-[200px] py-[5px] px-[9px] mt-[2px] hover:bg-white outline-none transition-all ease-in-out duration-300 focus:ring-[3px] focus:ring-red-500"
                        />
                    </div>
                    <a
                        className="px-[20px] py-[5px] rounded-lg bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all ease-in-out duration-300 text-center font-semibold hover:shadow-lg hover:shadow-red-700/[29%]"
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Apply
                    </a>
                </div>
                <div className="flex flex-row items-center justify-start mt-[30px] flex-wrap gap-[40px]">
                    {docs.data.map((doc) => (
                        <CardDocument
                            id={doc._id.$oid}
                            key={doc._id.$oid}
                            title={doc.title}
                            category={doc.category}
                            date={doc.date}
                            description={doc.description}
                            link={doc.link}
                            loggedIn={admin.loggedIn}
                            refetch={docs.refetch}
                        />
                    ))}
                    {/* <CardDocument
                        title="Buku Panduan"
                        category="Akademik"
                        date="14 Februari 2024"
                        description="Dokumen ini berisi panduan untuk kegiatan akademik"
                        link="https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing"
                    />
                    <CardDocument
                        title="Buku Panduan"
                        category="Akademik"
                        date="14 Februari 2024"
                        description="Dokumen ini"
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
            {modal && <ModalDocument handleExit={handleExit} />}
        </>
    );
}
