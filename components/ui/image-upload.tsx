"use-client"

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

import { UploadButton } from "@/lib/uploadthing";
import {Button } from '@/components/ui/button'
interface ImageUploadProps {
    disabled? :boolean;
    onChange: (value: string ) => void;
    onRemove: (value: string) => void;
    value: string[];
}


export const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [ isMounted, setIsMounted] = useState(false)
   
    
    console.log(value[0])
    useEffect(() => {
        setIsMounted(true)

    },[])
   

    if(!isMounted) {
        return null
    }
    const title = value?.length ? (
        <>
        <p>Upload Completed</p>
        <p> {value?.length} files</p>
        </>
    ) : null
    
    console.log(value)
    const ImgList = (
        <>
          {title}
          <ul>
             {value?.map(url => (
                  <li className="mt-2" key={url}>
                      <img src={url} alt="image" />
                      <Button onClick={() => {
                       
                          console.log( url)
                          onRemove(url)
                          }}>Remove</Button>
                  </li>
              ))}
          </ul>
        </>
    )

 
    return (
        <div>
        <UploadButton
        endpoint="mediaPost"
        onClientUploadComplete={(res) => {
        if(res) {

            toast.success("Image Uploaded")
            onChange(res?.find(img => img.fileUrl)?.fileUrl  || "")
            // onChange(res.map(image => image.fileUrl))
            
        }
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message)
          
        }}

      />
      <div className="flex items-center gap-4 mb-4">
         {ImgList}
      </div>
      </div>
     
    )

}