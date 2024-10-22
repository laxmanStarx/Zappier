"use client"

export const Input = ({ label, placeholder, onChange, type = "text" }: {
    label: string;
    placeholder: string;
    onChange: (e: any) => void;
    type?: "text" | "password"
}) => {
    return <div>
        <div className="text-md pb-2 pt-4">
           * <label>{label}</label>
        </div>

        <input className="border rounded px-4 py-2 w-full border-black" type={type} placeholder={placeholder} onChange={onChange} />


    </div>
}