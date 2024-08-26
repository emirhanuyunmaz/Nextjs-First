'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import UserTransactionCard from "./UserTransactionCard";

export default function DashboardLatesTransaction (){
    const [userData,setUserData] = useState([])
    const [value, setValue] = useState("All")
    const [maxElement,setMaxElement] = useState(8)
    const [fullData , setFullData] = useState(false)
    async function getAllData(){
        const {data} = await axios.get(`http://localhost:5000/api/dashboard/data/transaction/${value}`)
        console.log(data)
        setUserData(data)
    }

    async function getOrderName(){
        const {data} = await axios.get(`http://localhost:5000/api/dashboard/data/transaction/orderName`)
        console.log(data)
        setUserData(data)
    }

    async function getOrderEmail(){
        const {data} = await axios.get(`http://localhost:5000/api/dashboard/data/transaction/orderEmail`)
        console.log(data)
        setUserData(data)
    }

    async function filterLastTransaction(e){
        setValue(e.target.value);
    }

    useEffect(() => {
        getAllData()
    },[value,maxElement])

    return(<div className="flex flex-col mt-5 rounded-xl bg-slate-400 gap-3 p-3">
        
        <div className="flex flex-col md:flex-row justify-between " >
                <p className="text-white font-bold" >Lates Transaction</p>
            <div className="flex md:flex-row flex-col gap-3 mt-5 md:mt-0">
                <p onClick={() => getOrderEmail()} className="text-white font-bold border-b-2 border-slate-400  hover:border-white cursor-pointer" >Order Email</p>
                <p onClick={() => getOrderName()} className="text-white font-bold border-b-2 border-slate-400  hover:border-white cursor-pointer" >Order Name</p>
                
            </div>
            <select
            className="bg-slate-400 border-2 text-white"
            value={value}
            onChange={(e) => {
                filterLastTransaction(e)
            }}>
                <option value="All">All</option>
                <option value="Deleted">Deleted</option>
                <option value="Register">Register</option>
            </select>
        </div>
        {
            userData.slice(0,maxElement).map((item,index) => <UserTransactionCard key={index} transactionUser={item} />)
        }
        {
            userData.length > 8 && <div className="flex justify-center" >
                {   !fullData &&
                    <button onClick={() => {
                        setFullData(true)
                        setMaxElement(userData.length)
                    }} className="text-white" >All v</button>
                }

                {
                    fullData &&
                    <button onClick={() => {
                        setMaxElement(8)
                        setFullData(false)
                    }} className="text-white" >Less ^</button>
                }

            </div>
        }

    </div>)
}