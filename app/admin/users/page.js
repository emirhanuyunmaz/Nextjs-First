"use client";
import Button from "../_components/Button";
import UserCard from "../_components/UserCard";
import Dialog from "../_components/Dialog";
import { useEffect , useState } from "react";
import axios from "axios";
import Error from "next/error";

export default function Users(){
    
    const [dialogOpen,setDialogOpen] = useState(false)
    const [allUser,setAllUser] = useState([])
    const [searchUser,setSearchUser] = useState("")
    const [page,setPage] = useState(1)
    const [oldUserLength,setOldUserLengt] = useState(allUser.length)

    function newUserHandleClick(){
        setDialogOpen(!dialogOpen)
    }

    async function searchInput(event){
        console.log(event.target.value);
        const {data} = await axios.get(`http://localhost:5000/api/admin/data/allData/${event.target.value}`)
        console.log(data);
        setAllUser(data)
        setOldUserLengt(data.length)

    }

    async function orderEmail(){
        console.log("Email Sıralama işlemi...");
        try{
            const {data} = await axios.get(`http://localhost:5000/api/admin/data/length`)
            setOldUserLengt(data.length)
            if(page >= 1 ){
                if(searchUser.trim() === "" ){
                    const {data} = await axios.get(`http://localhost:5000/api/admin/data/emailOrder/${page}`)
                    setAllUser(data)
                    //console.log(data.length);
                    if(data.length === 0){
                        setPage(page - 1)
                    }
                }
            }
        }catch(e){
            console.log("HATA");
            throw new Error(e);
        }
    }

    async function orderName(){
        console.log("Ad a göre Sıralama işlemi...");
        try{
            const {data} = await axios.get(`http://localhost:5000/api/admin/data/length`)
            setOldUserLengt(data.length)
            if(page >= 1 ){
                if(searchUser.trim() === "" ){
                    const {data} = await axios.get(`http://localhost:5000/api/admin/data/nameOrder/${page}`)
                    setAllUser(data)
                    //console.log(data.length);
                    if(data.length === 0){
                        setPage(page - 1)
                    }
                }
            }
        }catch(e){
            console.log("HATA");
            throw new Error(e);
        }
    }

    async function getAllUsers(){
        console.log("Kullanıcı verileri..");
        
        //Yüklenme işlemini izlemek için konuldu
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // console.log("Arama işlemi c :"+searchUser.length);
        try{
            const {data} = await axios.get(`http://localhost:5000/api/admin/data/length`)
            setOldUserLengt(data.length)
            if(page >= 1 ){
                if(searchUser.trim() === "" ){
                    const {data} = await axios.get(`http://localhost:5000/api/admin/data/${page}`)
                    setAllUser(data)
                    //console.log(data.length);
                    if(data.length === 0){
                        setPage(page - 1)
                    }
                }
            }
        }catch(e){
            console.log("HATA");
            throw new Error(e);
        }
    }
     
    useEffect(() => {
        getAllUsers()
    },[page])
    
    return(
            <div className="mt-5 ml-10 mb-10 mr-10 h-full ">
            <div className="md:h-[81%]">
            {
                dialogOpen && <Dialog viewControl={dialogOpen}/> 
            }
            <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 md:justify-between items-center gap-4 text-white ml-6 mr-6">
                <form className="flex flex-col md:flex-row  gap-5">
                    {/* veriler bir karakter geriden geliyor */}
                    <input value={searchUser} onChange={(event) => {
                        setSearchUser(event.target.value)
                        // searchUserHandleClick(event)
                        // console.log(event.target.value);
                        searchInput(event)
                        }} type="text" className="text-gray-500 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" placeholder="Searach" />
                    {/* <Button onClick={(event) => searchUserHandleClick(event)} name={`Search`} /> */}
                    <Button name={"Refresh"} />
                </form>
                
                <div className="grid grid-cols-1 md:flex md:justify-end w-full">
                    <Button name={`New User`} onClick={newUserHandleClick}/>
                </div>
                
            </div>

            <div className="flex flex-col gap-3 md:mt-5 md:mx-5 ">
                <div className="grid grid-cols-2 md:grid-cols-4  justify-between md:ms-20">
                    <p onClick={(e) => orderName()} className="text-slate-400 text-sm cursor-pointer hover:text-slate-500 duration-300 "> order-name</p>
                    <p onClick={(e) => orderEmail()} className="text-slate-400 text-sm cursor-pointer hover:text-slate-500 duration-300 "> order-email</p>
                </div>
                {
                    allUser.length !== 0 && allUser.map((user,index) => <UserCard key={index} user ={user}  />)
                }
            </div>
            </div>
            <div className="mt-auto">
                <div className="flex mt-3 justify-center text-white gap-2 ">
                    { searchUser.length === 0 && (() => {
                        //console.log(page);
                        const arr = [];
                        // Buradaki işlemsayesinde 6 nın katı olmaya elemanları da gösterme işlemi yapılcaktır.
                        if(oldUserLength % 6 !== 0){
                            setOldUserLengt(oldUserLength+1)
                        }
                        for (let i = 1; i <= (oldUserLength/6); i++) {
                            arr.push(
                                <div key={i} >
                                    <button onClick={()=>{
                                        setPage(i)
                                        setSearchUser("")
                                        getAllUsers()
                                        }} className="bg-slate-400 px-4 py-2 rounded-full " >{i}</button>
                                </div>
                            );
                        }
                        return arr;
                })()}
                </div>
            </div>
        </div>
        )
}