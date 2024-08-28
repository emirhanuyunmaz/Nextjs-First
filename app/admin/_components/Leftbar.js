import { X } from "lucide-react";
import Link from "next/link";


export default function Leftbar({control,setControl}){

    return(<>
    <aside className="fixed md:hidden top-0 left-0 z-50 w-64 h-screen transition-transform text-white bg-slate-400" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">
    <div onClick={() => setControl(false)} className="text-white flex justify-end">
        <X/>
    </div>
    <div className="flex gap-2 items-center mb-10">
        <img width={60} height={60} src="https://picsum.photos/id/1/260/260" className="rounded-full" />
        <h2>Admin</h2>
    </div>
      <p className="text-xs mb-5 text-slate-100">Pages</p>
      <ul className="space-y-2 font-medium flex flex-col gap-3 ms-3">
         <li>
            <Link onClick={() => setControl(false)} href={"/admin/dashboard"}>Dashboard</Link>
         </li>

         <li>
            <Link onClick={() => setControl(false)} href={"/admin/users"}>Users</Link>
         </li>
         
         <li>
            <Link onClick={() => setControl(false)} href={"/admin/products"} >Products</Link>
         </li>

      </ul>
   </div>
</aside>
<div onClick={() => setControl(false)} className="md:hidden opacity-25 fixed inset-0 z-40 bg-black"></div>
</>
)
}