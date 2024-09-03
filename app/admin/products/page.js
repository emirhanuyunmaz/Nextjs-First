'use client'
import { Button } from "../../../components/ui/button";
import { DataTableProduct } from "../../../components/ui/data-table-product";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
  } from "/components/ui/pagination"
import { Input } from "../../../components/ui/input";

export default function Page(){

    const searchParams = useSearchParams()
    const searchPage = searchParams.get('p')
    const searchProductUrl = searchParams.get('s')

    const router = useRouter()
    const [productList , setProductList] = useState([])
    const [page , setPage] = useState(1)
    const [productLength,setProductLength] = useState(0)
    const [search,setSearch] = useState(searchProductUrl !== null ? searchProductUrl : "")


    function addProductHandleClick(){
        router.push("products/addProduct")
    }

    async function searchProduct(){
        if(search !== "" && search !== null){
            // console.log();        
            const productList = await axios.get(`http://localhost:5000/api/product/searchProduct/${search}`)
            // console.log("Arama sonucu ürün listesi:",productList.data);
            // console.log("Arama parametresi :",search);
            setProductList(productList.data)
            searchURL()
        }
    }

    async function getAllProduct(){
        console.log("Sayfa bilgisi useSearchParams:",page);
        if(page!==null){    
            const res = await axios.get(`http://localhost:5000/api/product/productList/${page}`)
            console.log(res.data);
            setProductList(res.data)
        }else{    
            const res = await axios.get(`http://localhost:5000/api/product/productList/${1}`)
            console.log(res.data);
            setProductList(res.data)
        }
    }
    function pageChange(page){
        router.push(`http://localhost:3000/admin/products?p=${page}`)
        setPage(page)
    }

    function searchURL(){
        // console.log("Search URL function : ",search);
        router.push(`http://localhost:3000/admin/products?p=${page}&s=${search}`)
        // searchProduct()
    }

    async function allDataLength (){
        console.log("Sayfa bilgisi:",page)
        const dataLength = await axios.get(`http://localhost:5000/api/product/productLength/${page}`)
        // console.log("Toplam ürün sayısı:",dataLength.data.length)
        setProductLength(dataLength.data.length)
    }

    useEffect(() => {
        allDataLength()
        getAllProduct()
        searchProduct()
    },[page])

    useEffect(() => {
        // console.log("Arama işlemi:",searchProductUrl )
        searchProduct()
        setPage(searchPage)
        setSearch(searchProductUrl)
        // searchURL()
    },[])

    return(<div className="px-10 pt-10 flex flex-col justify-between h-full">
       <div className="md:h-[81%]">
            <div className="flex gap-3 justify-between ">
                <Button onClick={addProductHandleClick} >Add Product</Button>
                <div className="flex gap-2">
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Name" className=" px-5" />
                    <Button onClick={searchProduct}>Search</Button>
                </div>
            </div>
            <DataTableProduct data={productList}/>
       </div>

        <div className="mb-10">
           <Pagination>
           <PaginationContent>
           { (() => {
                        //console.log(page);
                        const arr = [];
                        // Buradaki işlemsayesinde 6 nın katı olmaya elemanları da gösterme işlemi yapılcaktır.
                        if(productLength % 6 !== 0){
                            setProductLength(productLength + 1)
                        }
                        for (let i = 1; i <= productLength / 6 ; i++) {
                            arr.push(
                                <PaginationItem  key={i} >
                                <PaginationLink onClick={() => {pageChange(i)}}>{i}</PaginationLink>
                                </PaginationItem>
                            );
                        }
                        return arr;
                })()}
                </PaginationContent>
                </Pagination>
           </div>
    </div>)
}