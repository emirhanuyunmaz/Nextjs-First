import { RiUserFollowFill } from "react-icons/ri";


export default function Toast({control,setControl}){
    
    function closeHandleClick(){
        setControl(false)
    }

    return(<>{
        control && <>
        <div id="toast-default" className="flex bg-slate-500 items-center w-full max-w-xs p-4 text-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            
            <span className=""> <RiUserFollowFill /></span>
        </div>
        <div className="ms-3 text-sm font-normal">Update User</div>
        <button type="button" onClick={closeHandleClick} className="ms-2 -mx-1.5 -my-1.5 bg-slate-500 text-gray-400 hover:text-white rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-slate-600 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#toast-default" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
        </button>
    </div>
    </>
    }</>)
}