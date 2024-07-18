'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const router = useRouter()

    async function signUpOnClick(event){
        event.preventDefault()
        const data = await axios.post('http://localhost:5000/api/data/signUp',{email,password},{
            withCredentials:true
        })
        console.log("asdds::"+data.request);
        if(data.status === 201){
            // localStorage.setItem('token', data.data.token )
            
            router.push("/user")
            //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdiNjdiOWY4ZDMyMGQxYzkyY2M1MSIsImlhdCI6MTcyMTI4NjIyMywiZXhwIjoxNzIxMjg3MTIzfQ.Nj5PBZK_AENOddw4QbFtHtHL-3LWNPw0varxkCbGJ1g
        }
    }

    return (<div className="flex flex-col gap-20 w-[100%] h-[100vh] justify-center items-center bg-slate-400 text-white">
        <h1 className="text-5xl" >Sign Up</h1>
        <form className="flex flex-col gap-5" action="">
            <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="outline-none px-2 py-1 rounded-2xl bg-slate-500 text-white" placeholder="Name" />
            <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="outline-none px-2 py-1 rounded-2xl bg-slate-500 text-white" />
            <button  onClick={(event)=>signUpOnClick(event)} className="bg-slate-500 mx-auto px-8 py-1 rounded-3xl hover:bg-slate-600 duration-300" >Sign In</button>
        </form>
    </div>)
}