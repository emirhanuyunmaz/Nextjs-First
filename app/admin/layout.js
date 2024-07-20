import { Suspense } from "react";
import Sidebar from "./_components/Sidebar";
import Loading from "./loading";

export default function Layout({children}){
    return(<div className="flex">
        <div className="flex-col min-h-[92vh] max-h-[92vh] w-1/5 p-4 text-white bg-slate-400 ">
            <Sidebar/>
        </div>
        <div className="w-4/5 pr-5 pt-0 mt-0">
            {/* <Suspense fallback={<Loading/>}> */}
                {children}
            {/* </Suspense> */}
        </div>
    </div>)
}