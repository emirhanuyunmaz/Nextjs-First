import DeleteButton from "./DeleteButton";
import ViewButton from "./ViewButton";

export default function UserCard({user}){
    // [ ] Kullanıcıya ait resmi gösterme yoksa default img tanımla
    // [ ] Loading işlemi
    // [ ] Error işlemleri


    return(
        <div className="flex justify-between bg-slate-400 px-1 gap-5 py-2 rounded-xl">
            <div className="flex justify-between w-full w-6/7 mr-5 gap-4 ">
                <div>
                    <img className="" src="" alt="" />
                    <p>{user.name}</p>
                </div>
                
                <p>{user.email}</p>
                <p>{user.password}</p>
            </div>
            <div className="flex gap-3 w-1/7">
                <ViewButton id={user._id} />
                <DeleteButton id={user._id} />
            </div>
        </div>
    )
}