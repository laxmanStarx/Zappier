import {ReactNode} from 'react'


export const SecondaryButton =({children,onClick, size= 'small'}:{
    children: ReactNode,
    onClick: ()=> void,
    size?: "big"| "small"
})=>{
    return <div onClick={onClick} className={`${size === "small"? "text-sm" : "text-xl"}
        ${size === "small" ? "px-8 pt-2" : " px-12 py-2"} cursor-pointer hover:shadow-lg bg-white border border-black text-black rounded-full`}>
            {children}
        </div>
    }