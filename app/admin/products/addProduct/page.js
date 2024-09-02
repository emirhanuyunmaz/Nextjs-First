'use client'
import { useEffect, useState } from "react";
import { ComboboxUser } from "../../../../components/ui/combobox";
import { Input } from "../../../../components/ui/input";
import ReactImageUploading from "react-images-uploading";
import { Button } from "../../../../components/ui/button";
import { FolderSync, Trash2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page(){
    const router = useRouter()
    const [ images , setImages ] = useState([])
    const [ name , setName ] = useState("")
    const [ price , setPrice ] = useState("")
    const [amount,setAmount] = useState("")
    const [personId,setPersonId] = useState("")

    const maxNumber = 4;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    }

    async function addProductHandleClick(){
        const res = await axios.post("http://localhost:5000/api/product/newProduct",{
            images:images,
            name:name,
            price:price,
            amount:amount,
            personId:personId
        })
        if(res.status === 201){
            router.push("/admin/products")
        }
        console.log(res)
    }
    
    useEffect(() => {
        console.log(images);
    },[images])
    
    useEffect(() => {
        console.log("personID:",personId)
    },[personId])
    

    return(<div className="flex flex-col gap-5 ms-10 me-10 mt-10">
        <div className="flex flex-col md:flex-row gap-5">
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
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
                <button
                className="w-32 h-32 border-2 hover:border-black duration-300"
                onClick={onImageUpload}
                {...dragProps}
                >
                +
                </button>
                &nbsp;
                <Button onClick={onImageRemoveAll}>Remove all</Button>
                {imageList.map((image, index) => (
                <div key={index} className="flex flex-col  gap-5 image-item">
                    <img src={image['data_url']} alt="" width="100" />
                    <div className="flex justify-center items-center gap-2">
                    <button className="hover:bg-gray-300 px-2 py-2 rounded-xl dura" onClick={() => onImageUpdate(index)}><FolderSync /></button>
                    <button className="hover:bg-gray-300 px-2 py-2 rounded-xl dura" onClick={() => onImageRemove(index)}><Trash2 /></button>
                    </div>
                </div>
                ))}
            </div>
            )}
      </ReactImageUploading>
        </div>
            <Button onClick={addProductHandleClick}>Add Product</Button>
    </div>)
}