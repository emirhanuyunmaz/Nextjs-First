'use client'
import axios from "axios"
import { useEffect, useState } from "react";

export default function DashboardTotalUserCard(){
    const [userLength,setUserLength] = useState(0)

    async function getTotalUser(){
        const {data} = await axios.get("http://localhost:5000/api/data/length")
        console.log(data.length);
        setUserLength(data.length)
    }
    
    useEffect(() => {
        getTotalUser()
    },[])

    return(<div className="bg-slate-400 text-white flex flex-col justify-center items-center gap-5 w-56 h-32 rounded-3xl p-5 hover:bg-slate-500 duration-300" >
        <h2 className="text-xl" >Total User</h2>
        <p className="text-2xl " >{userLength}</p>

    </div>
    )
}