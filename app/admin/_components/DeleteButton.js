import axios from "axios"

export default function DeleteButton({id}){

    async function deleteHandleClick(){
        // console.log(id)
        const res = await axios.delete(`http://localhost:5000/api/data/${id}`,
            {id:id}
        )
        //console.log(res);
    }

    return(<button onClick={deleteHandleClick} className="bg-red-500 px-2 h-8 py-1 rounded-xl text-sm">
        Delete
    </button>)
}