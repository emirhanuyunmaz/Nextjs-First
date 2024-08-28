import Link from "next/link";



export default function Sidebar(){
    return(<div className="hidden md:flex flex-col  text-slate-200">
    <div className="flex gap-2  items-center ">
        <img width={60} height={60} src="https://picsum.photos/id/1/260/260" className="rounded-full" />
        <h2>Admin</h2>
    </div>
    
    <div className="flex flex-col gap-3 mt-4">
        <h3 className=" text-sm">Pages</h3>
        <Link className="block bg-slate-400 px-2 py-1 rounded-xl text-white hover:bg-slate-500 duration-500"  href={"/admin/dashboard"}  >Dashboard</Link>
        <Link className="block bg-slate-400 px-2 py-1 rounded-xl text-white hover:bg-slate-500 duration-500"  href={"/admin/users"}  >Users</Link>
        <Link className="block bg-slate-400 px-2 py-1 rounded-xl text-white hover:bg-slate-500 duration-500"  href={"/admin/products"}  >Products</Link>
    </div>
    </div>)
}