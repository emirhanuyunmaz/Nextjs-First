import Link from "next/link"

export default function ViewButton({id}){
    
    return(<Link href={`/admin/${id}`} className="bg-green-500 h-8 px-2 py-1 rounded-xl text-sm" >View</Link>)
}