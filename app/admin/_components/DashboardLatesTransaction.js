'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import { DataTableDashboard } from "../../../components/ui/data-table-dashboard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../components/ui/select"

export default function DashboardLatesTransaction (){

    //Redux eklenecek

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

    return(<div className="flex flex-col mt-5 rounded-xl gap-3 p-3">
        
        <div className="flex  md:w-1/6 ms-auto" >
                <Select onValueChange={setValue} >
                    <SelectTrigger className="">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Deleted">Deleted</SelectItem>
                        <SelectItem value="Register">Register</SelectItem>
                    </SelectContent>
                </Select>
            
        </div>
        {
            <DataTableDashboard data={userData} />
        }
    </div>)
}