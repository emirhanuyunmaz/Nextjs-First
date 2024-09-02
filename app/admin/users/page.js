"use client";
import { useContext, useEffect, useState  } from "react";
import { DataTable } from "../../../components/ui/data-table";
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "../../../components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
  } from "/components/ui/pagination"
import { userListPageContext } from "../../../context/userListPageContext";
import { Input } from "../../../components/ui/input";

export default function Users(){
    const [search, setSearch] = useState("");

    const searchParams = useSearchParams()
    const searchPage = searchParams.get('p')
    
    const router = useRouter()
    
    const contextL = useContext(userListPageContext)
    
    function newUserHandleClick(){
        router.push("users/newUser")
    }
    
    function pageChange(page){
        router.push(`http://localhost:3000/admin/users?p=${page}`)
    }

    

    useEffect(() => {
        contextL.UserList(searchPage ? searchPage : 1)
    },[searchPage])

    useEffect(() => {
        contextL.searchData(search,searchPage)
    },[search])
    
    return(
            <div className="mt-5 ml-10 mr-10 h-full ">
            <div className="md:h-[81%]">
            
            <div className="flex justify-between items-start gap-3 md:ml-6">
                <Button onClick={newUserHandleClick}>
                            New User
                </Button>
                <div className="flex gap-3">
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="" />
                    <Button>Search</Button>
                </div>
            </div>

            <div className="flex flex-col gap-3 md:mt-5 md:mx-5 ">
                {/* Kullanıcı listesi - Start */}
                
                <DataTable data={contextL.userList}  />
                
                {/* Kullanıcı Listesi - End */}

            </div>
            </div>
           <div>
           <Pagination>
           <PaginationContent>
           { (() => {
                        //console.log(page);
                        const arr = [];
                        // Buradaki işlemsayesinde 6 nın katı olmaya elemanları da gösterme işlemi yapılcaktır.
                        if(contextL.userListLength % 6 !== 0){
                            
                            contextL.setUserListLength( contextL.userListLength + 1)
                        }
                        for (let i = 1; i <= (contextL.userListLength/6); i++) {
                            arr.push(
                                <PaginationItem  key={i} >
                                <PaginationLink isActive={i == searchPage } onClick={() => {pageChange(i)}}>{i}</PaginationLink>
                                </PaginationItem>
                            );
                        }
                        return arr;
                })()}
                </PaginationContent>
                </Pagination>
           
           </div>
        </div>
        )
}