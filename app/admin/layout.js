import { Suspense } from "react";
import Sidebar from "./_components/Sidebar";
import Loading from "./loading";
import Leftbar from "./_components/Leftbar";

export default function Layout({children}){
    return(<div className="flex">
        <div className="hidden md:flex flex-col min-h-[100vh] w-1/5 p-4 text-white bg-slate-400 ">
            <Sidebar/>
        </div>
        <div className="w-full md:w-4/5 md:pr-5 pt-0 mt-0">
            {/* <Suspense fallback={<Loading/>}> */}
                {children}
            {/* </Suspense> */}
        </div>
        
    </div>)
}