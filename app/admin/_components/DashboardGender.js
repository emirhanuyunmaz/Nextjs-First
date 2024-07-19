'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";


export default function DashboardGender(){

    const [dataGender,setDataGender] = useState({})

    async function getData(){
        const {data} = await axios.get("http://localhost:5000/api/dashboard/data/transaction/gender")
        // console.log(data);
        setDataGender(data)
    }
    useEffect(() => {
        getData()
    },[])
    
    return(<div className="w-56 h-32 p-5 rounded-3xl flex  duration-300" >
        <ul>
            <li className="text-[#36C2CE]" >Man</li>
            <li className="text-[#FF6969]" >Woman</li>
        </ul>
        <PieChart
        data={[
            { title: 'Man', value: dataGender.man, color: '#36C2CE' },
            { title: 'Woman', value: dataGender.woman, color: '#FF6969' },
        ]}
        />
    </div>)
}