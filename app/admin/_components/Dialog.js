"use client";
import axios from "axios";
import { useEffect, useState } from "react"
import Toast from "./Toast";


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
    const [dialogShow,setDialogShow] = useState(false)

    //Her resim eklendiğinde resmi güncellemek için kullanılıyor.
    useEffect(() => {
      uploadImages()
    },[userImage] )
    // console.log(userImage);

    function uploadImages(){
      //console.log(userImage);
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

    function closeHandleClick(){
        setView(!view)
    }

    async function newUserAdd(){
      //console.log(userImage)
      // console.log(userName+
      //   userSurname+
      //   userEmail+
      //   userPassword+
      //   userGender+
      //   userBirthDay+
      //   userPhoneNumber);
      
      //Boşlukları temizleyerek boş string gönderilmesinin önüne geçildi
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
            //console.log(response)
            setView(false)
        }else{
            //Boşluklar için toast mesaj gönderilecek
            setDialogShow(true)
        }
    }

    return(
    <>
    {
        view && <>
            <div className="pt-5 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative flex justify-center items-center w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    New User
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-slate-400 hover:text-slate-500 float-right text-xl leading-none font-semibold outline-none focus:outline-none" onClick={closeHandleClick} >
                    X
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 w-[100%] text-center flex-auto justify-center items-center ">
                    <div className="flex-col justify-center items-center ">
                       <div className="">
                          <input value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="name" className="w-1/3 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                            
                            <input value={userSurname} onChange={(event) => setUserSurname(event.target.value)} placeholder="surname" className="w-1/3 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />

                            <input value={userEmail} onChange={(event) => setUserEmail(event.target.value)}  placeholder="email" className="w-1/3 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />

                            <input type="date" value={userBirthDay} onChange={(event) => setUserBirthDay(event.target.value)}  placeholder="birth day" className="w-1/3 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />

                            <input value={userPassword} onChange={(event) => setUserPassword(event.target.value)} placeholder="password" type="password" className="w-1/3 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />

                            <input value={userPhoneNumber} onChange={(event) => setUserPhoneNumber(event.target.value)} placeholder="phone number" type="tel" className="w-1/3 m-3 outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" />
                            
                            <div className="flex-col  m-3 " >
                            <label htmlFor="">Gender</label>
                            <div className="flex gap-5  justify-center mx-auto ">
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
                            <label  className="flex justify-center" htmlFor="newUserImage">
                              <img height={150} width={100} src={`${userImage ? userImage : "/not_img.jpeg"}`} alt="" />
                            </label>
                            <input id="newUserImage" accept="image/png, image/jpeg" className="hidden"  onChange={(event) => setUserImage(event.target)} type="file" />
                        </div>
                       </div>
                  
                </div>
                {/*footer*/}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-slate-400 hover:text-slate-500"
                    type="button"
                    onClick={closeHandleClick}
                  >
                    Close
                  </button>
                  <button
                    className="px-2 py-1 text-white bg-slate-400 rounded-xl hover:bg-slate-500"
                    type="button" onClick={newUserAdd}>
                    Add User
                  </button>
                </div>
              </div>
            </div>
            {/* Dialog - Start */}  
              <div className="absolute text-black bottom-0"><Toast control={dialogShow} setControl={setDialogShow} /></div>
            {/* Dialog - End */}
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    }
    </>
        )
}