"use client"
import axios from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Button from "../_components/Button";

export default function Page (){
    //ID ye göre kullanıcı çekme işlemleri.
    const {id} = useParams()
    //console.log(id);
    
    const [userName , setUserName] = useState()
    const [userSurname , setUserSurname] = useState()
    const [userEmail , setUserEmail] = useState()
    const [userPhoneNumber , setUserPhoneNumber] = useState()
    const [userGender , setUserGender] = useState()
    const [userBirthDay , setUserBirthDay] = useState()
    const [userPassword , setUserPassword] = useState()

    async function getUser(){
        const getSingleUser = await axios.get(`http://localhost:5000/api/data/user/${id}`)
        console.log(getSingleUser);
    }



    useEffect(() => {
        getUser()
    },[id])

    return (<div className="p-10 gap-5">
            <div className="flex items-center gap-5 p-5" >
                <img width={200} height={200} className="rounded-full" src="https://picsum.photos/id/1/300/300" alt="" />
                <Button name={"User Remove"} />
            </div>
            <div className="flex flex-col gap-5">
                    {/* ROW - 1 */}
                <div className="flex flex-col gap-5 ">
                    <h2>User Information</h2>
                    <div className="flex w-8/10 gap-5 justify-center" >
                        <div className="flex-col w-full gap-5" >
                            <label htmlFor="">Name</label>
                            <input className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        </div>
                        <div className="w-full flex-col gap-5" >
                            <label>Surname</label>
                            <input className="w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        </div>
                    </div>
                </div>
                {/* ROW - 1 - END */}

                {/* ROW - 2 - Start */}
                <div className="flex w-8/10 gap-5 justify-center" >
                    <div className="flex-col w-full gap-20 " >
                        <label htmlFor="">Gender</label>
                        <div className="flex gap-5  ">
                            <div className="flex gap-3  h-auto border-2 px-4 py-1">
                                <label htmlFor="Men" >MEN</label>
                                <input type="radio" id="Men" name="Gender" className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                            </div>
                            <div className="flex gap-3 border-2 px-4 py-1 " >
                            <label htmlFor="Woman">WOMAN</label>
                            <input type="radio" id="Woman" name="Gender" className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex-col gap-5" >
                        <label>Date of Birth</label>
                        <input placeholder="MM/DD/YYYY" type="date"  value={"MM/DD/YYYY"} className="w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                    </div>
                </div>
                {/* ROW - 2 END */}

                {/* ROW - 3 - START */}
                <div className="flex flex-col ">
                    <div className="flex w-8/10 gap-5 justify-center" >
                        <div className="flex-col w-full gap-5" >
                            <label htmlFor="">Phone Number</label>
                            <input type="tel" className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        </div>
                        <div className="w-full flex-col gap-5" >
                            <label>Email</label>
                            <input type="email" className="w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        </div>
                    </div>
                </div>
                {/* ROW - 3 - END */}

            {/* ROW - 4 - START */}
            <div className="flex flex-col mr-5">
                    <div className="flex justify-start w-8/10 gap-5 " >
                        <div className="flex-col items-start w-1/2 gap-5" >
                            <label htmlFor="">Password</label>
                            <input type="tel" className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        </div>
                        {/* <div className="w-full flex-col gap-5" >
                            <label>Email</label>
                            <input type="email" className="w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        </div> */}
                    </div>
                </div>
                {/* ROW - 4 - END */}

                <div>
                    <Button name={"Update"} />
                </div>
            </div>

    </div> )
}