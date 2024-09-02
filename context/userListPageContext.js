import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const userListPageContext = createContext()

export function UserListPageContextProvider({children}){

    const [userList,setUserList] = useState([])
    const [userListLength,setUserListLength] = useState(0)
    const [oldPage,setOldPage] = useState(1)

    function userListLengthAdd(){
        setUserListLength(userListLength)
    }

    
    async function UserListLength() {
        const length = await axios.get(`http://localhost:5000/api/admin/data/length`)
        // console.log(length.data.length)
        setUserListLength(length.data.length)
    }

    async function UserList(page){
        const getUserList = await axios.get(`http://localhost:5000/api/admin/data/${page}`)
        // console.log("CONTEXT::",getUserList);
        setUserList(getUserList.data)
        setOldPage(page)
        await UserListLength()
    }

    async function searchData(search,page){
        if(search === ""){
            UserList(page)
        }else{
            const data = await axios.get(`http://localhost:5000/api/admin/data/allData/${search}`)
            console.log(data.data.length);
            setUserList(data.data)
            setUserListLength(data.data.length)
        }
    }

    async function getUser(id,setUserName,
        setUserSurname,
        setUserEmail,
        setUserPhoneNumber,
        setUserGender,
        setUserBirthDay,
        setUserPassword,
        setUserImage){
        try{
            const {data} = await axios.get(`http://localhost:5000/api/admin/data/user/${id}`)
            //console.log(data[0].image);
            setUserName(data[0].name)
            setUserSurname(data[0].surname)
            setUserEmail(data[0].email)
            setUserPhoneNumber(data[0].phoneNumber)
            setUserGender(data[0].gender)
            setUserBirthDay(data[0].birthDay)
            setUserPassword(data[0].password)
            // setUserImage(data[0].image)
            setUserImage(`http://localhost:5000/api/admin/data/user/image/${id}`)
        }catch(e){
            console.log(e);
            //notFound()
            throw new Error(e)
        }
    }

    async function addNewUser( userName , userSurname , userEmail , userPassword , userImage , userGender , userBirthDay , userPhoneNumber ){
        const response = await axios.post(`http://localhost:5000/api/admin/data`,{
            name:userName,
            surname:userSurname,
            email:userEmail,
            password:userPassword,
            image:userImage,
            gender:userGender,
            birthDay:userBirthDay,
            phoneNumber:userPhoneNumber
        })
        console.log(response);
        //Verilerin uzantıları değiştirilecek..
        const responseTransaction = await axios.post(`http://localhost:5000/api/dashboard/data/transaction`,{
            id:response.data._id,
            name:userName,
            surname:userSurname,
            email:userEmail,
            transaction:"Register"
        })
        UserListLength()
    }

    async function deleteHandleClick(id){
        console.log("Silinecek kullanıcı",id)
        const res = await axios.delete(`http://localhost:5000/api/admin/data/${id}`,
            {id:id}
        )
        // console.log(res);
        const responseTransaction = await axios.post(`http://localhost:5000/api/dashboard/data/transaction`,{
            id:res.data[0]._id,
            name:res.data[0].name,
            surname:res.data[0].surname,
            email:res.data[0].email,
            transaction:"Deleted"
        })
        // UserList(oldPage)
        UserListLength()
    }

    async function updateOnClick(id,userName,userSurname,userEmail,userPhoneNumber,userGender,userBirthDay,userPassword,userImage){
        
        const res = await axios.post(`http://localhost:5000/api/admin/data/user/${id}`,{
            name:userName,
            surname:userSurname,
            email:userEmail,
            phoneNumber:userPhoneNumber,
            gender:userGender,
            birthDay:userBirthDay,
            password:userPassword,
            image:userImage
        })
        
    }

    useEffect(()=>{
        UserList(oldPage)
        UserListLength()
    },[])

    return(<userListPageContext.Provider value={{userList,userListLength,setUserListLength,UserList,UserListLength,deleteHandleClick,addNewUser,updateOnClick,getUser,userListLengthAdd,searchData}}>
        {children}
    </userListPageContext.Provider>)

}
