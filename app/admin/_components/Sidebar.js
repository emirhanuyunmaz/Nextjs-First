import AdminLink from "./AdminLink";


export default function Sidebar(){
    return(<>
    <div className="flex gap-2  items-center ">
                <img src="https://picsum.photos/id/1/60/60" className="rounded-full" />
                <h2>Admin</h2>
            </div>
            
            <div className="flex flex-col gap-3 mt-4">
                <h3 className="text-slate-200 text-sm">Pages</h3>
                <AdminLink path={"/admin/dashboard"} name={"Dashboard"} />
                <AdminLink path={"/admin/users"} name={"Users"} />
                <AdminLink path={"/admin/products"} name={"Products"} />
    </div>
    </>)
}