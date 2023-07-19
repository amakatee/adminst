'use client'
import React, { useState } from 'react'
import {Store} from '@prisma/client'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'

import Heading from '@/components/ui/heading' 
import { Button} from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import toast from 'react-hot-toast'
import { AlertModal } from '@/components/modals/alert-modal'



interface SettingFormProps {
    initialData: Store;
    userId: string;
}

const formSchema = z.object({
    name: z.string().min(1),

})

type SettingFormValues = z.infer<typeof formSchema>

const SettingsForm: React.FC<SettingFormProps> = ({initialData, userId}) => {
    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const params = useParams()
    const router = useRouter()
    console.log(params)

    const form = useForm<SettingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (data:SettingFormValues) => {
        try{
            setLoading(true)
            console.log(params.storeid)
            await axios.patch(`/api/stores/${params.storeid}`, {data, userId})
            router.refresh()
            toast.success("Store Updated")

        }catch(err) {
            console.log(err)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    } 
    const onDelete = async () => {
        try{
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeid}`);
            router.refresh()
            router.push('/')
            toast.success("Store deleted")
        }catch(err: any) {
            console.log(err)
            toast.error("Make sure you removed all products and categories first")
        } finally {
            setLoading(false)
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
      <div>{initialData.name}</div>
       <div className='flex items-center justify-between'>
        <Heading
          title="Settings"
          description="Manage store preferences"
        />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        > <Trash className='w-4 h-4' />
        </Button>
       </div>
       <Separator />
       <Form {...form}>
           <form 
           className='w-full space y-8'
           onSubmit={form.handleSubmit(onSubmit)}>
               <div className='grid grid-cols-3 gap-8'>
                   <FormField
                   control={form.control}
                   name='name'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                               <Input disabled={loading} placeholder="Store Name" {...field}/>
                           </FormControl>
                           <FormMessage />
                       </FormItem>
                   )}
                    />

               </div>
               <Button disabled={loading} className="ml-auto" type="submit">
                   Save Changes
               </Button>

           </form>

       </Form>
       
      </>
    
  )
}

export default SettingsForm