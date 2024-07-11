"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"


export default function Dialog({viewControl}){
  //Kullanıcı Ekleme işlemi yapılcağı alan...
    const [view,setView] = useState(viewControl)//Bu değişken dialog penceresinin görünüp görünmemesini belirler.
    const [userName,setUserName] = useState("")
    const [userSurname,setUserSurname] = useState("")
    const [userPhoneNumber,setUserPhoneNumber] = useState("")
    const [userBirthDay,setUserBirthDay] = useState("")
    const [userGender,setUserGender] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userPassword,setUserPassword] = useState("")
    const [userImage , setUserImage] = useState()

    

    //Her resim eklendiğinde resmi güncellemek için kullanılıyor.
    useEffect(() => {
      uploadImages()
    },[userImage] )

    function uploadImages(){
      //console.log(userImage);
      //Burada yapılan işlem sayesinde resmin img etiketine eklenmesi yapılmaktadır.
      if (userImage && userImage.files && userImage.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          setUserImage(e.target.result)
          console.log(userImage);
        };
        reader.readAsDataURL(userImage.files[0]);
    }
    else{
      //Toast mesaj eklenecek.
      console.log("işlem yapılamadı");
    }
    }

    function closeHandleClick(){
        setView(!view)
    }

    async function newUserAdd(){
        //Boşlukları temizleyerek boş string gönderilmesinin önüne geçildi

        console.log(userName+
          userSurname+
          userEmail+
          userPassword+
          
          userGender+
          userBirthDay+
          userPhoneNumber);


        if(userImage && userName.trim() !== "" && userEmail.trim() !== "" && userPassword.trim() !== "" ){
            const response = await axios.post(`http://localhost:5000/api/data`,{
                name:userName,
                surname:userSurname,
                email:userEmail,
                password:userPassword,
                image:userImage,
                gender:userGender,
                birthDay:userBirthDay,
                phoneNumber:userPhoneNumber
              
            })
            console.log(response)
            setView(false)
        }else{
            //Boşluklar için toast mesaj gönderilecek
        }
    }

    return(
    <>
    {
        view && <>
            <div className="pt-10 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    New User
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={closeHandleClick} >
                    <span className="bg-transparent text-red-500 opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                    <div className="flex-col ">
                        <input value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="name" className="w-1/2 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        
                        <input value={userSurname} onChange={(event) => setUserSurname(event.target.value)} placeholder="surname" className="w-1/2 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />

                        <input value={userEmail} onChange={(event) => setUserEmail(event.target.value)}  placeholder="email" className="w-1/2 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />

                        <input type="date" value={userBirthDay} onChange={(event) => setUserBirthDay(event.target.value)}  placeholder="birth day" className="w-1/2 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />

                        <input value={userPassword} onChange={(event) => setUserPassword(event.target.value)} placeholder="password" type="password" className="w-1/2 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />

                        <input value={userPhoneNumber} onChange={(event) => setUserPhoneNumber(event.target.value)} placeholder="phone number" type="tel" className="w-1/2 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                        
                        <div className="flex-col w-full m-3 " >
                        <label htmlFor="">Gender</label>
                        <div className="flex gap-5  ">
                            <div className="flex gap-3  h-auto border-2 px-4 py-1">
                                <label htmlFor="0" >MEN</label>
                                <input type="radio" value={userGender} onChange={() => setUserGender(0)} id="0" name="Gender" className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                            </div>
                            <div className="flex gap-3 border-2 px-4 py-1 " >
                            <label htmlFor="1">WOMAN</label>
                            <input type="radio" value={userGender}  onChange={() => setUserGender(1)} id="1" name="Gender" className=" w-full outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                            </div>
                        </div>

                    </div>
                        <img height={150} width={100} src={`${userImage}` } alt="" />
                        <input accept="image/png, image/jpeg"  onChange={(event) => setUserImage(event.target)} type="file" />
                    </div>
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeHandleClick}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button" onClick={newUserAdd}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    }
    </>
        )
}