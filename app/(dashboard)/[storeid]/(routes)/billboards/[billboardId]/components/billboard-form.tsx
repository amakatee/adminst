'use client'
import React, { useState } from 'react'
import {Billboard} from '@prisma/client'
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
import { useOrigin } from '@/hooks/use-origin'


const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string()

})
type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormValuesProps {
    initialData: Billboard | null;
    // userId: string;
}


const BillboardForm: React.FC<BillboardFormValuesProps> = ({initialData}) => {
    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const params = useParams()
    const router = useRouter()

    const title = initialData ? "Edit Billboard" : "Create new BillBoard"
    const description = initialData ? "Edit a billboard " : "Add a new BillBoard"
    const toastMessage  = initialData ? "DillBoard succesfully Updated" : "Billboard succesfully created"
    const action = initialData ? "Update" : "Create"


  

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl:''
        }
    })
 

    const onSubmit = async (data:BillboardFormValues) => {
        try{
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeid}/billboards/${params.billboardId}`, {data})
            } else {
                await axios.post(`/api/${params.storeid}/billboards`, {data})

            }
            router.refresh()
            router.push(`/${params.storeid}/billboards`)
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
            await axios.delete(`/api/${params.storeid}/billboards/${params.billboardId}`);
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success("BillBoard deleted")
        }catch(err: any) {
            toast.error("Make sure you removed all categories usinf this billboard first")
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
               <div className='grid gap-8 grid-col-1'>
                   <FormField
                   control={form.control}
                   name='label'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Billboard title:</FormLabel>
                           <FormControl>
                               <Input className='w-[80vw]  block  rounded-md sm:text-sm 
                resize-none  overflow-hidden p-2 text-lg outline-none' disabled={loading} placeholder="Billboard label" {...field}/>
                           </FormControl>
                           <FormMessage />
                       </FormItem>
                   )}
                    />
                    <FormField
                   control={form.control}
                   name='imageUrl'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Upload (Single Image or Video)</FormLabel>
                           <FormControl>
                             <ImageUpload 
                               disabled={loading}
                               onChange={url => field.onChange(url)}
                               onRemove={() => field.onChange('')}
                               value={field.value ? [field.value] : [] } 
                             />
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

export default BillboardForm