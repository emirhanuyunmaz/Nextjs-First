'use client'
import { useEffect, useState } from "react";
import { ComboboxUser } from "../../../../components/ui/combobox";
import { Input } from "../../../../components/ui/input";
import ReactImageUploading from "react-images-uploading";
import { Button } from "../../../../components/ui/button";
import { FolderSync, Trash2 } from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";


export default function Page(){
    const {id} = useParams()
    const router = useRouter()
    // console.log(id);
    const [ images , setImages ] = useState([])
    const [ name , setName ] = useState("")
    const [ price , setPrice ] = useState("")
    const [amount,setAmount] = useState("")
    const [personId,setPersonId] = useState("")
    const [imagesList , setImagesList] = useState([])

    //Çoklu foto çekme ve listeleme işlemi...
    const maxNumber = 4;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    }
    //************************************** */

    async function getSingleProduct(){
        const res = await axios.get(`http://localhost:5000/api/product/singleProduct/${id}`)
        console.log(res.data[0])
        setName(res.data[0].name)
        setAmount(res.data[0].amount)
        setPrice(res.data[0].price)
        setPersonId(res.data[0].personId)
        setImagesList(res.data[0].images)        
    }


    async function updateProductHandleClick(){
        // const res = await axios.post("http://localhost:5000/api/product/newProduct",{
        //     images:images,
        //     name:name,
        //     price:price,
        //     amount:amount,
        //     personId:personId
        // })
        // console.log(res)
    }

    async function deleteProduct(){
        const res = await axios.delete(`http://localhost:5000/api/product/singleProduct/${id}`)
        router.push("/admin/products")
    }

    async function deleteSingleImage(imageLink){
        const res = await axios.delete(`${imageLink}`)
        getSingleProduct()
        // router.refresh()
    }
    

    useEffect(() => {
        getSingleProduct()
    },[])
    
    return(<div className="flex flex-col gap-5 ms-10 me-10 mt-10">
        <p>Product edits</p>
        <div className="flex gap-5">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price"/>
            <Input value={amount} onChange = {(e) => setAmount(e.target.value)} placeholder="Amount"/>
        </div>
        <div className="flex">
            <ComboboxUser setValue={setPersonId} value={personId} />
        </div>

        <div className="flex flex-wrap w-full">
        <ReactImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            >
            {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
            }) => (
            // write your building UI
            <div className="flex justify-center items-center flex-col md:flex-row gap-3">
                <button
                className="w-32 h-32 border-2 hover:border-black duration-300"
                onClick={onImageUpload}
                {...dragProps}
                >
                +
                </button>
                &nbsp;
                {/* <Button onClick={onImageRemoveAll}>Remove all</Button> */}
                {imageList.map((image, index) => (
                <div key={index} className="flex flex-col  gap-5 image-item">
                    <img src={image['data_url']} alt="" width="100" />
                    <div className="flex justify-center items-center gap-2">
                    <button className="hover:bg-gray-300 px-2 py-2 rounded-xl duration-300" onClick={() => onImageUpdate(index)}><FolderSync /></button>
                    <button className="hover:bg-gray-300 px-2 py-2 rounded-xl duration-300" onClick={() => onImageRemove(index)}><Trash2 /></button>
                    </div>
                </div>
                ))}
            </div>
            )}
      </ReactImageUploading>
            {
                imagesList.map((item,index) => <div key={index} className="flex flex-col justify-center items-center" ><img className="w-[100px] h-[100px]"  src={`${item}`} />
                <div className="flex justify-center items-center ">
                    <button className="hover:bg-gray-300 px-2 py-2 rounded-xl duration-300" ><FolderSync /></button>
                    <button onClick={() => deleteSingleImage(item)} className="hover:bg-gray-300 px-2 py-2 rounded-xl duration-300" ><Trash2 /></button>
                </div>
                </div>)
            }
        </div>
            <div className="flex">
                <Button onClick={updateProductHandleClick}>Update Product</Button>
                <Button onClick={deleteProduct}>Delete Product</Button>
            </div>
    </div>)
}