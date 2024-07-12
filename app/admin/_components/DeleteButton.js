import axios from "axios"
import { MdDelete } from "react-icons/md";


export default function DeleteButton({id}){

    async function deleteHandleClick(){
        // console.log(id)
        const res = await axios.delete(`http://localhost:5000/api/data/${id}`,
            {id:id}
        )
        //console.log(res);
    }

    return(<button onClick={deleteHandleClick} className="px-2 h-8 py-1 rounded-xl flex items-center justify-center ">
        <MdDelete className="hover:text-slate-500 duration-200" />
    </button>)
}