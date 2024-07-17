'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import UserTransactionCard from "./UserTransactionCard";

export default function DashboardLatesTransaction (){
    const [userData,setUserData] = useState([])

    async function getAllData(){
        const {data} = await axios.get("http://localhost:5000/api/data/transaction")
        console.log(data);
        setUserData(data)
    }

    useEffect(() => {
        getAllData()
    },[])

    return(<div className="flex flex-col mt-5 rounded-xl bg-slate-400 p-3">
        <p className="text-white font-bold" >Lates Transaction</p>
        {
            userData.slice(0,8).map((item,index) => <UserTransactionCard key={index} transactionUser={item} />)
        }

    </div>)
}