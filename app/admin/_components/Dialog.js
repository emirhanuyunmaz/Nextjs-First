"use client";
import axios from "axios";
import { useState } from "react"

export default function Dialog({viewControl}){
    const [view,setView] = useState(viewControl)
    const [userName,setUserName] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userPassword,setUserPassword] = useState("")

    function closeHandleClick(){
        setView(!view)
    }

    async function newUserAdd(){
        //Boşlukları temizleyerek boş string gönderilmesinin önüne geçildi
        if(userName.trim() !== "" && userEmail.trim() !== "" && userPassword.trim() !== ""){
            const response = await axios.post(`http://localhost:5000/api/data`,{
                name:userName,
                email:userEmail,
                password:userPassword 
            })
            console.log(response)
            setView(false)
        }else{
            //Boşluklar için toast mesaj gönderilecek
        }
    }

    return(
    <>
    {
        view && <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    New User
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                    <div className="flex-col ">
                        <input value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="name" className="outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        <input value={userEmail} onChange={(event) => setUserEmail(event.target.value)}  placeholder="email" className="outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        <input value={userPassword} onChange={(event) => setUserPassword(event.target.value)} placeholder="password" type="password" className="outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                    </div>
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeHandleClick}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button" onClick={newUserAdd}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    }
    </>
        )
}