import DeleteButton from "./DeleteButton";
import ViewButton from "./ViewButton";
import NotImage from "../../../public/not_img.jpeg"
import Image from "next/image"

export default function UserCard({user}){
    
    return(
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-between bg-slate-400 text-white px-1 gap-5 py-2 rounded-xl">
            <div className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 md:justify-between items-center w-full gap-4 ">
                <div className="flex justify-center md:justify-start items-center ps-3 gap-3">
                    <Image width={60} height={60} className="rounded-full" src={user.image ? user.image : NotImage} alt="" />
                    <div className="flex gap-1" >
                    <p className="truncate flex-1 w-full" >{user.name + ""}</p>
                    <p className="truncate flex-1 w-full" >{user.surname}</p>
                    </div>
                </div>
                
                <p className="text-center truncate flex-1 w-full" >{user.email}</p>
                <p className="text-center truncate flex-1 w-full">{user.password}</p>
            </div>
            <div className="flex items-center justify-center gap-3 md:w-1/7 md:mr-8">
                <ViewButton id={`/users/${user._id}`} />
                <DeleteButton id={user._id} />
            </div>
        </div>
    )
}