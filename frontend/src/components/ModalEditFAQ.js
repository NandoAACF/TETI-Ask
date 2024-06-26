import { updateFaq } from "@/services/faqs";
import Button from "./Button";
import { toast } from "react-toastify";

export default function ModalEditFAQ({ _faq, handleExit, refetch = () => {} }) {
    const handleUpdateFAQ = async (e) => {
        e.preventDefault();
        const form = e.target;
        const faq = {
            question: form.question.value,
            category: form.category.value,
            answer: form.answer.value,
        };
        try {
            const res = await updateFaq(_faq._id.$oid, faq);
            refetch();
            toast.success(res.data);
            handleExit();
        } catch (error) {
            toast.error("Failed to update FAQ " + error.message);
        }
    };
    return (
        <>
            <div className="flex flex-col items-center justify-center bg-opacity-50 bg-black w-full min-h-[100vh] overflow-hidden top-0 left-0 z-50 fixed">
                <div className="flex flex-col items-start justify-start bg-white rounded-2xl p-[30px] overflow-hidden relative max-h-[95vh]">
                    <h4 className="text-[25px] font-bold -mt-[3px]">Submit QnA</h4>
                    <form
                        className="flex flex-col items-start justify-start gap-[13px] mt-[14px] mb-[1px]"
                        onSubmit={handleUpdateFAQ}
                    >
                        <div className="flex flex-col relative w-[200px] sm:w-[400px] md:w-[600px]">
                            <input
                                type="text"
                                defaultValue={_faq.question}
                                className=" bg-white border-[1px] border-slate-300 focus:ring-[3px] focus:ring-orange-500 transition-all ease-in-out duration-200 rounded-[10px] w-full py-[5px] px-[10px] mt-[2px] outline-none text-[19px] font-semibold"
                                placeholder="Question"
                                name="question"
                            />
                        </div>
                        <div className="flex flex-col relative w-[200px] sm:w-[400px] md:w-[600px]">
                            <input
                                type="text"
                                defaultValue={_faq.category}
                                className=" bg-white border-[1px] border-slate-300 focus:ring-[3px] focus:ring-orange-500 transition-all ease-in-out duration-200 rounded-[10px] w-full py-[5px] px-[10px] mt-[2px] outline-none text-[18px] font-semibold"
                                placeholder="Category"
                                name="category"
                            />
                        </div>
                        <div className="flex flex-col relative w-[200px] sm:w-[400px] md:w-[600px]">
                            <textarea
                                defaultValue={_faq.answer}
                                className=" bg-white border-[1px] border-slate-300 focus:ring-[3px] focus:ring-orange-500 transition-all ease-in-out duration-200 rounded-[10px] w-full py-[5px] px-[10px] mt-[2px] outline-none min-h-[100px] max-h-[300px]"
                                placeholder="Answer"
                                name="answer"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-[18px] sm:gap-[20px] w-full mt-[15px] sm:mt-[20px]">
                            <Button
                                text="Cancel"
                                type="secondary2"
                                size="sm"
                                className="order-2 sm:order-1"
                                onClick={handleExit}
                            />
                            <Button text="Edit QnA" type="primary3" size="sm" className="order-1 sm:order-2" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
