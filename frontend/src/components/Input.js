export default function Input({ type = "text", label = "Label", className = "", name, value, onChange, error }) {
    return (
        <>
            <div className={`flex flex-col relative ${className}`}>
                <label className="text-[20px]">{label}</label>
                <input
                    type={type}
                    className="bg-white border-[1px] border-slate-300 rounded-[10px] w-full py-[7px] px-[7px] mt-[2px] focus:border-[4px] focus:border-red-500 outline-none transition-all ease-in-out duration-100"
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    );
}
