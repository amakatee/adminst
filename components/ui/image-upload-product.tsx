"use-client"

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

import { UploadButton } from "@/lib/uploadthing";
import {Button } from '@/components/ui/button'
interface ImageUploadProps {
    disabled? :boolean;
    onChange:  (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}


export const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [images, setImages] = useState <string[]> ([])
    const [ isMounted, setIsMounted] = useState(false)
    console.log(value, images)
   
    
   

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
    
   
   
  

   
    const ImgList = (
        <div className="flex flex-col gap-4" >
        {title}
          
          <ul className="flex w-full space-around">
              {/* {value.map(uploads =>  Object.values(uploads)?.map(url => (
                   <li className="mt-2" key={url}>
                   <img className="h-15 w-14"  src={url} alt="image" />
                   
                   <Button className="p-4 tex-xs" onClick={() => {
                    
                       console.log( url)
                       onRemove(url)
                       }}>x</Button>
               </li>
              )) )} */}
             {/* {value[0] && Object.values(value[0])?.map(url => (
                  <li className="mt-2" key={url}>
                      <img className="h-15 w-14"  src={url} alt="image" />
                      
                      <Button className="p-4 tex-xs" onClick={() => {
                       
                          console.log( url)
                          onRemove(url)
                          }}>x</Button>
                  </li>
              ))} */}
              {value.map(url => (
                  <li className="mt-2" key={url}>
                  <img className="h-15 w-14"  src={url} alt="image" />
                  
                  <Button className="p-4 tex-xs" onClick={() => {
                   
                      console.log( url)
                      onRemove(url)
                      }}>x</Button>
              </li>
              ))}
          </ul>
        </div>
    )

 
    return (
        <div>
        <UploadButton
        endpoint="mediaPost"
        onClientUploadComplete={(res ) => {
        if(res) {
            

            toast.success("Image Uploaded")
            // const formattedImages = res.map(({fileUrl, fileKey}) => ({
            //     url: fileUrl
            // }))
            const formattedResponse = res.map(({fileUrl, fileKey}) => ({
                     url: fileUrl
                 }))
            const newImages = formattedResponse?.map(image => image.url)
            // newImages.forEach(url => onChange(url))
            // setImages(newImages)
            onChange(newImages[0])
           
         // newImages.map(url => onChange(url))
            
            //  onChange(formattedImages.map(image => image.url))
            
        }
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message)
          
        }}

      />
      <div className="flex mt-5">
         {ImgList}
      </div>
      </div>
     
    )

}