import Link from "next/link";

export default function AdminLink({path,name}){
    return (<div className="block">
            <Link className="block bg-slate-400 px-2 py-1 rounded-xl text-white hover:bg-slate-500 duration-500" href={path} >{name}</Link>    
        </div>
    )

}