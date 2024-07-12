import Link from "next/link"
import { GrView } from "react-icons/gr";


export default function ViewButton({id}){
    
    return(<Link href={`/admin/${id}`} className="h-8 px-2 py-1 flex justify-center items-center rounded-xl text-sm " >
        <GrView className="hover:text-slate-500 duration-200"/>
    </Link>)
}