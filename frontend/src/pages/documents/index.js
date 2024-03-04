import CardDocument from "@/components/CardDocument";

export default function Document() {
    return (
        <div className="flex flex-col justify-start min-h-screen bg-slate-50 py-[30px] px-[50px] body">
            <h3 className="text-[40px] font-bold text-left">Documents</h3>
            <div className="flex flex-row items-center justify-start mt-[20px] gap-[15px]">
                <h4 className="text-[17px] font-medium text-left">Category:</h4>
                <select className="bg-white border-[1px] border-slate-300 rounded-[10px] w-[105px] sm:w-[150px] py-[5px] px-[7px] mt-[2px] hover:bg-white cursor-pointer outline-none transition-all ease-in-out duration-200">
                    <option value="all">All</option>
                    <option value="akademik">Akademik</option>
                    <option value="organisasi">Organisasi</option>
                </select>
            </div>
            <div className="flex flex-row items-center justify-start mt-[30px] flex-wrap gap-[40px]">
                <CardDocument
                    title="Buku Panduan"
                    category="Akademik"
                    description="Dokumen ini berisi panduan untuk kegiatan akademik"
                    link="https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing"
                />
                <CardDocument
                    title="Buku Panduan"
                    category="Akademik"
                    description="Dokumen ini berisi panduan untuk kegiatan akademik"
                    link="https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing"
                />
                <CardDocument
                    title="Buku Panduan"
                    category="Akademik"
                    description="Dokumen ini berisi panduan untuk kegiatan akademik"
                    link="https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing"
                />
                <CardDocument
                    title="Buku Panduan"
                    category="Akademik"
                    description="Dokumen ini berisi panduan untuk kegiatan akademik"
                    link="https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing"
                />
                <CardDocument
                    title="Buku Panduan"
                    category="Akademik"
                    description="Dokumen ini berisi panduan untuk kegiatan akademik"
                    link="https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing"
                />
                <CardDocument
                    title="Buku Panduan"
                    category="Akademik"
                    description="Dokumen ini berisi panduan untuk kegiatan akademik"
                    link="https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing"
                />
                <CardDocument
                    title="Buku Panduan"
                    category="Akademik"
                    description="Dokumen ini berisi panduan untuk kegiatan akademik"
                    link="https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing"
                />
                <CardDocument
                    title="Buku Panduan"
                    category="Akademik"
                    description="Dokumen ini berisi panduan untuk kegiatan akademik"
                    link="https://docs.google.com/document/d/1uyeYHZDYmIRauOLuYesSFHFc-BqG7iA7gn4t7qnmuhk/edit?usp=sharing"
                />
            </div>
        </div>
    );
}
