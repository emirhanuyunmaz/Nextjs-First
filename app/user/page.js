'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "./_components/Toast";

export default function Page({token}){
    //Kullanıcı detay sayfası 
    const [userID , setUserID] = useState("")
    const [userName , setUserName] = useState("")
    const [userSurname , setUserSurname] = useState("")
    const [userEmail , setUserEmail] = useState("")
    const [userPhoneNumber , setUserPhoneNumber] = useState("")
    const [userGender , setUserGender] = useState(0)
    const [userBirthDay , setUserBirthDay] = useState("")
    const [userPassword , setUserPassword] = useState("")
    const [userImage , setUserImage] = useState("")
    const [imageChanege  , setImageChange] = useState(true)
    const [toastControl , setToastControl] = useState(false)

    const route = useRouter()

    function updateImage(){
        console.log("Resmi güncelleme işlemi yapıldı");
        console.log(userImage);
        // console.log(userImage.files);
        // console.log(userImage.files[0]);
        if(imageChanege && userImage && userImage.files && userImage.files[0] ){
            let reader = new FileReader();
            reader.onload = function (e) {
                setUserImage(e.target.result)
                //console.log(userImage);
            };
            reader.readAsDataURL(userImage.files[0]);
        }
    }
    // const token = getCookie("jwt")

    async function getUserDetail(){
        console.log("Veri çekme işlemi");
         
        //Burada withCredentials cookies verileri çekme işlemi üzerine işlem yapakatadır.
        const user = await axios.get("http://localhost:5000/api/user/data/userDetail",{
            withCredentials:true
        }).catch((err) => {
            console.log(err.response.status);
            if( err.response?.status === 401){
            //Kullanıcı giriş yapması için uyarı ve giriş sayfasına gönderecek
                console.log("Kullanıcı oturum süresi dolmuş tekrar giriş yap")
                route.push("/signUp")
            }
        } )
        // console.log("Kullanıcı bilgileri::"+user);
        if(user?.status === 201){
            setUserID(user.data._id)
            setUserName(user.data.name)
            setUserSurname(user.data.surname)
            setUserEmail(user.data.email)
            setUserGender(user.data.gender)
            setUserPhoneNumber(user.data.phoneNumber)
            setUserPassword(user.data.password)
            setUserImage(user.data.image)
            setUserBirthDay(user.data.birthDay)
        }   
    }

    async function updateOnClick(){
        //Kullanıcı bilgilerini güncelleme işlemi...
        const res = await axios.post(`http://localhost:5000/api/admin/data/user/${userID}`,{
            name:userName,
            surname:userSurname,
            email:userEmail,
            phoneNumber:userPhoneNumber,
            gender:userGender,
            birdthDay:userBirthDay,
            password:userPassword,
            image:userImage
        })
        console.log("STATUS::"+res.status)
        if(res.status === 201 ){
            console.log("Kullanıcı bilgileri başarı ile güncellendi...")
            //Toast mesaj için kontrol işlemleri...
            setToastControl(true)
        }
        // router.push(`/admin/users`)
    }
    
    useEffect(() => {
       getUserDetail() 
    },[])
    useEffect(() => {
        updateImage()
    },[userImage])
    
    return(<div className="px-64 pt-10 gap-5 ">
        <div className="absolute t-5 left-2/4">
            <Toast control={toastControl} setControl={setToastControl} />
        </div>
        <div className="flex items-center gap-5 p-5" >
            {/* Resmin üzerine tıklanınca dosya seçme ekranı çıkıyor */}
            <label htmlFor="file-upload" className="hover:cursor-pointer"  >
                <img width={200}  height={200} className="rounded-full" src={`${userImage}`} alt="" />
            </label>
            <input onChange={(event) => setUserImage(event.target)} accept="image/png, image/jpeg" id="file-upload" type="file" className="hidden" />
            <button className="bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-xl duration-500">
                User Remove
            </button>

        </div>
        <div className="flex flex-col gap-5">
            {/* ROW - 1 */}
            <div className="flex flex-col gap-5 ">
                <h2>User Information</h2>
                <div className="flex w-8/10 gap-5 justify-center" >
                    {/* Name - Start */}
                    <div className="flex-col w-full gap-5" >
                        <label htmlFor="">Name</label>
                        <input value={userName} onChange={(event) => setUserName(event.target.value)} className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                    </div>
                    {/* Name - End */}

                    {/* Surname - Start */}
                    <div className="w-full flex-col gap-5" >
                        <label>Surname</label>
                        <input value={userSurname} onChange={((event) => setUserSurname(event.target.value) )} className="w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                    </div>
                    {/* Surname - End */}
                </div>
            </div>
            {/* ROW - 1 - END */}

            {/* ROW - 2 - Start */}
            <div className="flex w-8/10 gap-5 justify-center" >
                {/* Gender - Start */}
                <div className="flex-col w-full gap-20 " >
                    <label htmlFor="">Gender</label>
                    <div className="flex gap-5  ">
                        <div className="flex gap-3  h-auto border-2 px-4 py-1">
                            <label htmlFor="0" >MEN</label>
                            <input type="radio" checked={userGender === 0} onChange={() => setUserGender(0)} id="0" name="Gender" className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        </div>
                        <div className="flex gap-3 border-2 px-4 py-1 " >
                        <label htmlFor="1">WOMAN</label>
                        <input type="radio" checked={userGender === 1}  onChange={() => setUserGender(1)} id="1" name="Gender" className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        </div>
                    </div>
                </div>
                {/* Gender - End */}

                {/* Birth Day - Start */}
                <div className="w-full flex-col gap-5" >
                    <label>Date of Birth</label>
                    <input placeholder="MM/DD/YYYY" type="date"  value={userBirthDay} onChange={(event) => setUserBirthDay(event.target.value)} className="w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                </div>
                {/* Birth Day - End */}
            </div>
            {/* ROW - 2 END */}

            {/* ROW - 3 - START */}
            <div className="flex flex-col ">
                <div className="flex w-8/10 gap-5 justify-center" >
                    {/* Phone Number - Start */}
                    <div className="flex-col w-full gap-5" >
                        <label htmlFor="">Phone Number</label>
                        <input type="tel" value={userPhoneNumber} onChange={(event) => setUserPhoneNumber(event.target.value)} className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                    </div>
                    {/* Phone Number End */}

                    {/* Email - Start */}
                    <div className="w-full flex-col gap-5" >
                        <label>Email</label>
                        <input type="email" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} className="w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                    </div>
                    {/* Email - End */}
                </div>
            </div>
            {/* ROW - 3 - END */}

        {/* ROW - 4 - START */}
        <div className="flex flex-col mr-5">
                <div className="flex justify-start w-8/10 gap-5 " >
                    {/* Password - Start */}
                    <div className="flex-col items-start w-1/2 gap-5" >
                        <label htmlFor="">Password</label>
                        <input  type="text" value={userPassword} onChange={(event) => setUserPassword(event.target.value)} className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                    </div>
                    {/* Password - End */}
                </div>
            </div>
            {/* ROW - 4 - END */}

            <div>
                <button className="bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-xl duration-500" onClick={updateOnClick}>
                    Update
                </button>
            </div>
        </div>
        
    </div>)
}