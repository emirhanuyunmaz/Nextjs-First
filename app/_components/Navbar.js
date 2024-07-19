import Link from "next/link";

export default function Navbar(){
    return(<nav className="bg-slate-500 flex px-8 py-4 justify-between text-white w-[100%]">
        <Link href={``}>Admin</Link>

        <div className="flex gap-3">    
            <Link href={`/`}>Home</Link>
            <Link href={`/user`}>User Detail</Link>
            <Link href={`/contact`}>Contact</Link>
            <Link href={`/about`}>About</Link>
            <Link href={`/logaout`}>Logout</Link>
        </div>
    </nav>)
}