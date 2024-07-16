"use client";

import Button from "../_components/Button";
import UserCard from "../_components/UserCard";
import Dialog from "../_components/Dialog";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Users(){
    
    const [dialogOpen,setDialogOpen] = useState(false)
    const [allUser,setAllUser] = useState([])
    const [searchUser,setSearchUser] = useState("")
    const [page,setPage] = useState(1)
    const [oldUserLength,setOldUserLengt] = useState(allUser.length)

    function newUserHandleClick(){
        setDialogOpen(!dialogOpen)
    }

    async function searchUserHandleClick(event){
        console.log("Arama işlemi yapıldı");
        event.preventDefault()
        if(searchUser.trim() !== ""){
            const {data} = await axios(`http://localhost:5000/api/data/search/${searchUser}`)
            setAllUser(data);
        }
    }

    async function getAllUsers(){
        //Yüklenme işlemini izlemek için konuldu
        //await new Promise((resolve) => setTimeout(resolve, 2000));
        const {data} = await axios.get(`http://localhost:5000/api/data/length`)
        setOldUserLengt(data.length)
        if(page >= 1 ){
            if(searchUser.trim() === "" ){
                const {data} = await axios.get(`http://localhost:5000/api/data/${page}`)
                setAllUser(data)
                //console.log(data.length);
                if(data.length === 0){
                    setPage(page - 1)
                }
            }
        }

    }
     
    useEffect(() => {
        getAllUsers()
    },[allUser,page])

    
    return(
        <div className="mt-10 ml-10 ">
            {
                dialogOpen && <Dialog viewControl={dialogOpen}/> 
            }
        <div className="flex justify-between items-center gap-4 text-white">
            <form className="flex gap-5">
                <input value={searchUser} onChange={(event) => setSearchUser(event.target.value)} type="text" className="text-gray-500 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" placeholder="Serach" />
                <Button onClick={(event) => searchUserHandleClick(event)} name={`Search`} />
                <Button name={"Refresh"} />
            </form>
            <Button name={`New User`} onClick={newUserHandleClick}/>
            
        </div>
        <div className="flex flex-col gap-3 mt-5">
            <p className="text-slate-400 text-sm" >users list</p>
            {
                 allUser.length !== 0 && allUser.map((user,index) => <UserCard key={index} user ={user}  />)
            }
        </div>
            
        <div className="absolute bottom-3 left-1/2">
            <div className="flex mt-5 justify-center text-white gap-2 ">
                {(() => {
                    //console.log(page);
                    const arr = [];
                    // Buradaki işlemsayesinde 6 nın katı olmaya elemanları da gösterme işlemi yapılcaktır.
                    if(oldUserLength % 6 !== 0){
                        setOldUserLengt(oldUserLength+1)
                    }
                    for (let i = 1; i <= (oldUserLength/6); i++) {
                        arr.push(
                            <div key={i} >
                                <button onClick={()=>setPage(i)} className="bg-slate-400 px-4 py-2 rounded-full " >{i}</button>
                            </div>
                        );
                    }
                    return arr;
            })()}
            </div>
        </div>
        {/* <div className="absolute bottom-0 ">
            <Toast/>
        </div> */}
    </div>
    )
}