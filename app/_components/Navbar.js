'use client'
import { Menu } from "lucide-react";
import Link from "next/link";
import Leftbar from "../admin/_components/Leftbar";
import { useState } from "react";

export default function Navbar(){

    const [leftbarControl , setLeftbarControl] = useState(false) 


    return(<nav className="bg-slate-500 flex px-8 py-4 justify-between text-white w-[100%]">
        <div onClick={() => setLeftbarControl(true)} className="md:hidden" >
            <Menu />
        </div>
        <Link href={``}>Admin</Link>
        <div className="md:flex gap-3 hidden">    
            <Link className="border-b-2 border-slate-500 hover:border-white" href={`/`}>Home</Link>
            <Link className="border-b-2 border-slate-500 hover:border-white" href={`/user`}>User Detail</Link>
            <Link className="border-b-2 border-slate-500 hover:border-white" href={`/contact`}>Contact</Link>
            <Link className="border-b-2 border-slate-500 hover:border-white" href={`/about`}>About</Link>
            <Link className="border-b-2 border-slate-500 hover:border-white" href={`/logaout`}>Logout</Link>
        </div>
        <div className={`${!leftbarControl && "hidden"} `}>
            <Leftbar control={leftbarControl} setControl={setLeftbarControl}/>
        </div>
    </nav>)
}