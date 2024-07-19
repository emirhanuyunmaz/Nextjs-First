'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import Toast from "../admin/_components/Toast"
import { useRouter } from "next/navigation"

export default function Page(){
    const router = useRouter()
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [gender,setGender] = useState("")
    const [birthDay,setBirthDay] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [userImage,setUserImage] = useState()
    const [control,setControl] =useState(false)
    const [passwordView,setPasswordView] = useState(false)

    useEffect(() => {
        uploadImages()
    },[userImage] )

    async function signInHandleClick(event){
        event.preventDefault()
        
        if(name.trim() !== "" && surname.trim() !== "" && password.trim() !== "" && email.trim() !== "" ){
            const response = await axios.post(`http://localhost:5000/api/admin/data`,{
                name:name,
                surname:surname,
                email:email,
                password:password,
                image:userImage,
                gender:gender,
                birthDay:birthDay,
                phoneNumber:phoneNumber
            })
            console.log(response.status);
            if(response.status === 201){

                const responseTransaction = await axios.post(`http://localhost:5000/api/dashboard/data/transaction`,{
                    id:response.data._id,
                    name:name,
                    surname:surname,
                    email:email,
                    transaction:"Register"
                })
                router.push("/signUp")
            }
            setControl(false)
        }else{
            setControl(true)
        }   
    }

    function uploadImages(){
        console.log(userImage);
        //Burada yapılan işlem sayesinde resmin img etiketine eklenmesi yapılmaktadır.
        if (userImage && userImage.files && userImage.files[0]) {
          let reader = new FileReader();
          reader.onload = function (e) {
            setUserImage(e.target.result)
            //console.log(userImage);
          };
          reader.readAsDataURL(userImage.files[0]);
        }
        else{
          console.log("işlem yapılamadı");
        }
      }


    return(<div className="bg-slate-400 w-[100%] h-[100vh] flex flex-col text-white justify-center items-center" >
        <h1 className="text-5xl" >Sign In</h1>
        <form className="flex w-1/3 flex-col gap-3 p-8" >
            <input value={name} onChange={(e) =>setName(e.target.value) } type="text" placeholder="Name" className="outline-none px-2 py-1 rounded-2xl bg-slate-500 text-white" />
            
            <input value={surname} onChange={(e) => setSurname(e.target.value)} type="text" placeholder="Surname" className="outline-none px-2 py-1 rounded-2xl bg-slate-500 text-white" />
            
            <input value={email} onChange={(e) => setEmail(e.target.value) } type="text" placeholder="Email" className="outline-none px-2 py-1 rounded-2xl bg-slate-500 text-white" />
            
            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value) } type="text" placeholder="Phone Number" className="outline-none px-2 py-1 rounded-2xl bg-slate-500 text-white" />
            
            <input value={password} onChange={(e) => setPassword(e.target.value)} type={`password`} placeholder="Password" className="outline-none px-2 py-1 rounded-2xl bg-slate-500 text-white" />
            
            <input value={birthDay} onChange={(e) => setBirthDay(e.target.value)} type="date" className="outline-none px-2 py-1 rounded-2xl bg-slate-500 text-white" />
            
            <label htmlFor="">Gender</label>
            <div className="flex gap-5  justify-center mx-auto ">
                <div className="flex gap-3  h-auto border-2 px-4 py-1">
                    <label htmlFor="0" >MEN</label>
                    <input type="radio" value={gender} onChange={() => setGender(0)} id="0" name="Gender" className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                </div>

                <div className="flex gap-3 border-2 px-4 py-1 " >
                <label htmlFor="1">WOMAN</label>
                <input type="radio" value={gender}  onChange={() => setGender(1)} id="1" name="Gender" className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                </div>
            </div>
            
            <label className="flex justify-center" htmlFor="newUserImage">
                <img src={`${userImage ? userImage : "/not_img.jpeg"}`}  className="w-32 h-32" alt="" />
            </label>
            <input id="newUserImage" accept="image/png, image/jpeg" className="hidden" onChange={(event) => {
                setUserImage(event.target)}}  type="file" />
            
            <button onClick={(event)=>signInHandleClick(event)} className="bg-slate-500 hover:bg-slate-600 px-8 py-1 rounded-2xl mx-auto duration-300" >Sign In</button>
        </form>
                <div className="absolute bottom-10">
                    <Toast control={control} setControl={setControl} />
                </div>
    </div>)
}