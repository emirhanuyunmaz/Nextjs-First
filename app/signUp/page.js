'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Toast from "../admin/_components/Toast"
import UserToast from "./_components/UserToast"

export default function Page(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [toastControl,setToastControl] = useState(false)
    const [userControl,setUserControl] =useState(false)
    const router = useRouter()

    //Giriş yapılınca giriş yapıldı olarak eylemlere eklenebilir.
    async function signUpOnClick(event){
        event.preventDefault()
        if(email.trim() !== "" && password.trim() !== ""){
            setToastControl(false)
            try{
                const data = await axios.post('http://localhost:5000/api/user/data/signUp',{email,password},{
                    withCredentials:true
                })
                // console.log("asdds::"+data.request);
                if(data?.status === 201){
                    router.push("/user")            
                }
            }catch(err){
                if(err.response?.status === 402){
                    //Kullanıcı bulunamadı
                    console.log("Kullanıcı bulunamadı");
                    setUserControl(true)           
                } 
            }
        }else{
            setToastControl(true)
        }
    }

    return (<div className="flex flex-col gap-20 w-[100%] h-[92.4vh] justify-center items-center bg-slate-400 text-white">
        <h1 className="text-5xl" >Sign Up</h1>
        <form className="flex flex-col w-1/4 gap-5" action="">
            <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="outline-none px-2 py-1 rounded-2xl bg-slate-500 text-white" placeholder="Email" />
            <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="outline-none px-2 py-1 rounded-2xl bg-slate-500 text-white" />
            <button  onClick={(event)=>signUpOnClick(event)} className="bg-slate-500 mx-auto px-8 py-1 rounded-3xl hover:bg-slate-600 duration-300" >Sign In</button>
        </form>
        <div className="absolute bottom-5">
            <Toast control={toastControl} setControl={setToastControl} />
            <UserToast control={userControl} setControl={setUserControl} />
        </div>
    </div>)
}