import { useGetDocumentCategory } from "@/services/document"

export default function SelectDocumentCategory({handleCategory, status}){
    const {category} = useGetDocumentCategory(status)
    return (
        <select
            onChange={handleCategory}
            className="bg-white border-[1px] border-slate-300 rounded-[10px] w-[125px] sm:w-[150px] py-[5px] px-[7px] mt-[2px] hover:bg-white cursor-pointer outline-none transition-all ease-in-out duration-200"
        >
            <option value="">All</option>
            {category.map(item => <option value={item} key={item}>{item}</option>)}
        </select>
    )
}