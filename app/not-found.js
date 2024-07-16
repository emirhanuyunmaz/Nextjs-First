'use client'
import { useRouter } from "next/navigation"

export default function NotFound(){

    const route = useRouter()

    function handleClick(){
        route.push("/admin")
    }

    return(<div className="bg-slate-400 text-white flex flex-col gap-5 justify-center items-center h-[100vh]">
        <h1 className="text-3xl" >NOT FOUND</h1>
        <button onClick={handleClick} className="bg-slate-500 px-4 py-1 rounded-3xl" >Try Again</button>
    </div>)
}