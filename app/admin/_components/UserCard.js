import DeleteButton from "./DeleteButton";
import ViewButton from "./ViewButton";
import NotImage from "../../../public/not_img.jpeg"
import Image from "next/image"

export default function UserCard({user}){
    // [ ] Loading işlemi
    // [ ] Error işlemleri

    return(
        <div className="flex justify-between bg-slate-400 px-1 gap-5 py-2 rounded-xl">
            <div className="flex justify-between items-center w-full w-6/7 mr-5 gap-4 ">
                <div className="flex items-center">
                    <Image width={60} height={60} className="rounded-full" src={user.image ? user.image : NotImage} alt="" />
                    <div className="flex gap-1" >
                    <p>{user.name + ""}</p>
                    <p>{user.surname}</p>
                    </div>
                </div>
                
                <p>{user.email}</p>
                <p>{user.password}</p>
            </div>
            <div className="flex items-center gap-3 w-1/7">
                <ViewButton id={user._id} />
                <DeleteButton id={user._id} />
            </div>
        </div>
    )
}