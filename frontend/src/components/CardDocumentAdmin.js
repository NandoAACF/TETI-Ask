import { deleteDocument, verifyDocument } from "@/services/document";
import { toast } from "react-toastify";

export default function CardDocumentAdmin({
    id,
    title = "Buku Panduan",
    category = "Akademik",
    date = "14 Februari 2024",
    description = "Dokumen ini berisi panduan untuk kegiatan akademik",
    link = "https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing",
    refetch
}) {
    const handleVerivyDocument = async () => {
        try {
            const res = await verifyDocument(id);
            refetch();
            toast.info(res.data);
        } catch (error) {
            toast.error("failed to verify document " + error);
        }
    };
    const handleRejectDocument = async () => {
        try {
            const res = await deleteDocument(id);
            refetch();
            toast.info(res.data);
        } catch (error) {
            toast.error("failed to reject document " + error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-between w-[259px] sm:w-[279px] sm:h-[290px] pb-[20px] bg-white rounded-[10px] shadow-md relative">
            <div className="flex flex-col items-start justify-between w-full h-full">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="w-full h-[30px] rounded-t-[10px] bg-red-600"></div>
                    <div className="flex flex-col items-start justify-start w-full px-[13px] mt-[10px]">
                        <h4 className="text-[20px] font-semibold text-black ">{title}</h4>
                        <div className="flex flex-col items-start justify-start w-full mt-[8px] gap-[8px] flex-wrap">
                            <div className="flex flex-col items-center justify-center px-[7px] py-[2px] rounded-md bg-green-400">
                                <p className="text-[12px] text-black font">{category}</p>
                            </div>
                        </div>
                        <h5 className="text-[14px] text-gray-500 mt-[8px]">{date}</h5>
                        <h5 className="text-[14px] font-normal text-black mt-[6px]">{description}</h5>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full px-[13px]">
                    <button
                        className="w-full px-[10px] py-[5px] rounded-lg bg-green-600 text-white mt-[10px] hover:bg-green-800 active:bg-green-900 transition-all ease-in-out duration-300 text-center font-semibold hover:shadow-lg hover:shadow-[#2471AB]/[29%]"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleVerivyDocument}
                    >
                        Verify Document
                    </button>
                    <button
                        className="w-full px-[10px] py-[5px] rounded-lg bg-red-600 text-white mt-[13px] hover:bg-red-700 active:bg-red-800 transition-all ease-in-out duration-300 text-center font-semibold hover:shadow-lg hover:shadow-[#2471AB]/[29%]"
                        onClick={handleRejectDocument}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Reject Document
                    </button>
                </div>
            </div>
        </div>
    );
}
