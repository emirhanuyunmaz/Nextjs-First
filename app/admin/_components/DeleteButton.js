import axios from "axios"
import { MdDelete } from "react-icons/md";


export default function DeleteButton({id}){

    async function deleteHandleClick(){
        // console.log(id)
        const res = await axios.delete(`http://localhost:5000/api/admin/data/${id}`,
            {id:id}
        )
        console.log(res);
        const responseTransaction = await axios.post(`http://localhost:5000/api/dashboard/data/transaction`,{
            id:res.data[0]._id,
            name:res.data[0].name,
            surname:res.data[0].surname,
            email:res.data[0].email,
            transaction:"Deleted"
        })

        // console.log("RESPONSE DELETED::"+res);
    }

    return(<button onClick={deleteHandleClick} className="px-2 h-8 py-1 rounded-xl flex items-center justify-center ">
        <MdDelete className="hover:text-slate-500 duration-200" />
    </button>)
}