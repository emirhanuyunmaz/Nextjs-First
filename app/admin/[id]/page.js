"use client"
import axios from "axios";
import { useParams } from "next/navigation"
import { useEffect } from "react";
import LoadingComp from "../_components/LoadingComp";

export default function Page (){
    //ID ye göre kullanıcı çekme işlemleri.
    const {id} = useParams()
    console.log(id);
    
    function getUser(){
        const getSingleUser = axios.get(`http://localhost:5000/api/data/user/${id}`)
        console.log(getSingleUser);
    }

    useEffect(() => {
        getUser()
    },[id])

    return (<div>
        <img src="" alt="" />
        {/* <LoadingComp/> */}
    </div> )
}