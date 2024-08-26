import AdminLink from "./AdminLink";


export default function Sidebar(){
    return(<div className="hidden md:flex flex-col  text-slate-200">
    <div className="flex gap-2  items-center ">
        <img width={60} height={60} src="https://picsum.photos/id/1/260/260" className="rounded-full" />
        <h2>Admin</h2>
    </div>
    
    <div className="flex flex-col gap-3 mt-4">
        <h3 className=" text-sm">Pages</h3>
        <AdminLink path={"/admin/dashboard"} name={"Dashboard"} />
        <AdminLink path={"/admin/users"} name={"Users"} />
        <AdminLink path={"/admin/products"} name={"Products"} />
    </div>
    </div>)
}