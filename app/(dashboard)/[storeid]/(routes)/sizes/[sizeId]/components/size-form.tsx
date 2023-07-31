'use client'
import React, { useState } from 'react'
import { Size} from '@prisma/client'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'

import { ImageUpload } from '@/components/ui/image-upload'
import Heading from '@/components/ui/heading' 
import { Button} from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import toast from 'react-hot-toast'
import { AlertModal } from '@/components/modals/alert-modal'


const formSchema = z.object({
    name: z.string().min(1),
    value: z.string()

})
type SizeFormValues = z.infer<typeof formSchema>

interface SizeFormValuesProps {
    initialData: Size | null;
    // userId: string;
}


const SizeForm: React.FC<SizeFormValuesProps> = ({initialData}) => {
    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const params = useParams()
    const router = useRouter()

    const title = initialData ? "Edit size" : "Add new size"
    const description = initialData ? "Edit size " : "Add new size"
    const toastMessage  = initialData ? "size succesfully Updated" : "size succesfully created"
    const action = initialData ? "Update" : "Create"


  

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value:''
        }
    })
 

    const onSubmit = async (data:SizeFormValues) => {
        try{
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeid}/sizes/${params.sizeId}`, {data})
            } else {
                await axios.post(`/api/${params.storeid}/sizes`, {data})

            }
            router.refresh()
            router.push(`/${params.storeid}/sizes`)
            toast.success(toastMessage)

        }catch(err) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    } 
    const onDelete = async () => {
        try{
            setLoading(true)
            await axios.delete(`/api/${params.storeid}/sizes/${params.sizeId}`);
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success("Size deleted")
        }catch(err: any) {
            toast.error("Make sure you removed all products usimg this size")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }
   
  return (
      <>
      <AlertModal
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
       />
     
       <div className='flex items-center justify-between'>
        <Heading
          title={title}
          description={description}
        />
        { initialData && 
         <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
        > <Trash className='w-4 h-4' />
        </Button>
        }
       
       </div>
       <Separator />
       <Form {...form}>
           <form 
           className='w-full my-8'
           onSubmit={form.handleSubmit(onSubmit)}>
               <div className='grid gap-8 mb-8 grid-col-1'>
                   <FormField
                   control={form.control}
                   name='name'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Billboard title:</FormLabel>
                           <FormControl>
                               <Input className='w-[80vw]  block  rounded-md sm:text-sm 
                               resize-none  overflow-hidden p-2 text-lg outline-none' disabled={loading} placeholder="Size name" {...field}/>
                           </FormControl>
                           <FormMessage />
                       </FormItem>
                   )}
                    />
                   
                   <FormField
                   control={form.control}
                   name='value'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Value title:</FormLabel>
                           <FormControl>
                               <Input className='w-[80vw]  block  rounded-md sm:text-sm 
                               resize-none  overflow-hidden p-2 text-lg outline-none' disabled={loading} placeholder="Value name" {...field}/>
                           </FormControl>
                           <FormMessage />
                       </FormItem>
                   )}
                    />
                   

               </div>
               <Button disabled={loading} className="ml-auto" type="submit">
                   {action}
               </Button>
            </form>
        </Form>
        <Separator />
        
       
      </>
    
  )
}

export default SizeForm