"use client";

import Button from "../_components/Button";
import UserCard from "../_components/UserCard";
import Dialog from "../_components/Dialog";
import {  Suspense, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading";

export default function Users(){

    const [dialogOpen,setDialogOpen] = useState(false)
    const [allUser,setAllUser] = useState([])
    const [searchUser,setSearchUser] = useState("")

    function newUserHandleClick(){
        setDialogOpen(!dialogOpen)
    }

    async function searchUserHandleClick(event){
        event.preventDefault()
        if(searchUser.trim() !== ""){
            const {data} = await axios(`http://localhost:5000/api/data/${searchUser}`)
            setAllUser(data);
        }
    }

    async function getAllUsers(){
        //Yüklenme işlemini izlemek için konuldu
        //await new Promise((resolve) => setTimeout(resolve, 2000));

        if(searchUser.trim() === "" ){
            const {data} = await axios.get(`http://localhost:5000/api/data`)
            setAllUser(data)
        }
        
    }
    useEffect(() => {
        getAllUsers()
    },[allUser])

    return(
        <div className="mt-10 ml-10 ">
            
            {
                dialogOpen && <Dialog viewControl={dialogOpen}/> 
            }
        <div className="flex justify-between items-center gap-4">
            <form className="flex gap-5">
                <input value={searchUser} onChange={(event) => setSearchUser(event.target.value)} type="text" className="outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" placeholder="Serach" />
                <Button onClick={(event) => searchUserHandleClick(event)} name={`Search`} />
                <Button name={"Refresh"} />
            </form>
            <Button name={`New User`} onClick={newUserHandleClick}/>
            
        </div>
        <div className="flex flex-col gap-3 mt-5">
            <p>users list</p>
        <div className = "flex justify-between w-5/6 " >
            <p className="text-slate-400 text-sm" >Name</p>
            <p className="text-slate-400 text-sm" >Email</p>
            <p className="text-slate-400 text-sm" >Password</p>
        </div>
            {
                 allUser.length !== 0 && allUser.map((user,index) => <UserCard key={index} user ={user}  />)
            }
        </div>
    </div>
    )
}