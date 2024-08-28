"use client"
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../../../components/ui/input";
import { DatePicker } from "../../../../components/ui/date-picker";
import { Button } from "../../../../components/ui/button";
import { userListPageContext } from "../../../../context/userListPageContext";
import { useToast } from "../../../../components/ui/use-toast"


export default function Page(){
    //Yeni kullanıcı ekleme işlemi
    const contextUs = useContext(userListPageContext)
    const { toast } = useToast()

    const [userName , setUserName] = useState("")
    const [userSurname , setUserSurname] = useState("")
    const [userEmail , setUserEmail] = useState("")
    const [userPhoneNumber , setUserPhoneNumber] = useState("")
    const [userGender , setUserGender] = useState(0)
    const [userBirthDay , setUserBirthDay] = useState(new Date())
    const [userPassword , setUserPassword] = useState("")
    const [userImage , setUserImage] = useState()
    // console.log("userImages:::",userImage);
    

    const router = useRouter()
    // router.refresh()
    function updateImage(){
        console.log("Resmi güncelleme işlemi yapıldı");
        
        if( userImage && userImage.files && userImage.files[0] ){
            let reader = new FileReader();
            reader.onload = function (e) {
                setUserImage(e.target.result)
                //console.log(userImage);
            };
            reader.readAsDataURL(userImage.files[0]);
        }
    }


    async function newUserAdd(){

        //Boşlukları temizleyerek boş string gönderilmesinin önüne geçildi
          if(userName !== "" && userSurname !== "" && userImage !== undefined && userEmail !== "" && userPassword !== "" && userGender !== "" && userBirthDay !== "" && userPhoneNumber !== ""){
            
            contextUs.addNewUser(userName,userSurname,userEmail,userPassword,userImage,userGender,userBirthDay,userPhoneNumber)
            router.push("/admin/users")
          
        }else{
            toast({
                title: "Error",
                description: "Err",
              })
            console.log("Boş veriler var");
        }
      }
    
    
    useEffect(() => {
        updateImage()
    },[userImage])

    return(<div className="p-10 gap-5">
        <div className="flex flex-col md:flex-row items-center gap-5 p-5" >
            {/* Resmin üzerine tıklanınca dosya seçme ekranı çıkıyor */}
            <label htmlFor="file-upload" className="hover:cursor-pointer"  >
                <img width={200}  height={200} className="rounded-full" src={userImage ? userImage : "/not_img.jpeg"} alt="" />
            </label>
            <input onChange={(event) => setUserImage(event.target)} accept="image/png, image/jpeg" id="file-upload" type="file" className="hidden" />
            
        </div>
        <div className="flex flex-col gap-5">
            {/* ROW - 1 */}
            <div className="flex flex-col gap-5 ">
                <h2>User Information</h2>
                <div className="flex flex-col md:flex-row w-8/10 gap-5 justify-center" >
                    {/* Name - Start */}
                    <div className="flex-col w-full gap-5" >
                        <label htmlFor="">Name</label>
                        <Input value={userName} onChange={(event) => setUserName(event.target.value)}  />
                    </div>
                    {/* Name - End */}

                    {/* Surname - Start */}
                    <div className="w-full flex-col gap-5" >
                        <label>Surname</label>
                        <Input value={userSurname} onChange={((event) => setUserSurname(event.target.value) )}  />
                    </div>
                    {/* Surname - End */}
                </div>
            </div>
            {/* ROW - 1 - END */}

            {/* ROW - 2 - Start */}
            <div className="flex flex-col md:flex-row w-8/10 gap-5 justify-center" >
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
                <div className="w-full flex flex-col " >
                    <label>Date of Birth</label>
                    
                    <DatePicker userDate = {userBirthDay} setUserDate={setUserBirthDay} />
                </div>
                {/* Birth Day - End */}
            </div>
            {/* ROW - 2 END */}

            {/* ROW - 3 - START */}
            <div className="flex flex-col ">
                <div className="flex flex-col md:flex-row w-8/10 gap-5 justify-center" >
                    {/* Phone Number - Start */}
                    <div className="flex-col w-full gap-5" >
                        <label htmlFor="">Phone Number</label>
                        <Input type="tel" value={userPhoneNumber} onChange={(event) => setUserPhoneNumber(event.target.value)}  />
                    </div>
                    {/* Phone Number End */}

                    {/* Email - Start */}
                    <div className="w-full flex-col gap-5" >
                        <label>Email</label>
                        <Input type="email" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} />
                    </div>
                    {/* Email - End */}
                </div>
            </div>
            {/* ROW - 3 - END */}

        {/* ROW - 4 - START */}
        <div className="flex flex-col md:mr-5">
                <div className="flex flex-col md:flex-row justify-start md:w-8/10 md:gap-5 " >
                    {/* Password - Start */}
                    <div className="flex-col items-start md:w-1/2 md:gap-5" >
                        <label htmlFor="">Password</label>
                        <Input  type="text" value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
                    </div>
                    {/* Password - End */}
                    
                </div>
            </div>
            {/* ROW - 4 - END */}
            <div className="flex flex-col md:flex-row">
                <Button onClick={() => newUserAdd()}>
                    Add User
                </Button>
            </div>
        </div>
</div>)
}