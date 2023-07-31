'use client'
import React, { useState } from 'react'
import { Billboard, Category} from '@prisma/client'
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
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'


const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string()

})
type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormValuesProps {
    initialData: Category | null;
    billboards: Billboard[]
   
}


const CategoryForm: React.FC<CategoryFormValuesProps> = ({initialData, billboards}) => {
    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const params = useParams()
    const router = useRouter()

    const title = initialData ? "Edit Category" : "Create new Category"
    const description = initialData ? "Edit a Category " : "Add a new Category"
    const toastMessage  = initialData ? "Category succesfully Updated" : "Category succesfully created"
    const action = initialData ? "Update" : "Create"


  

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            billboardId:''
        }
    })
 

    const onSubmit = async (data:CategoryFormValues) => {
        try{
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeid}/categories/${params.categoryId}`, {data})
            } else {
                await axios.post(`/api/${params.storeid}/categories`, {data})

            }
            router.refresh()
            router.push(`/${params.storeid}/categories`)
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
  
            await axios.delete(`/api/${params.storeid}/categories/${params.categoriesId}`);
            router.refresh()
            router.push(`/${params.storeId}/categories`)
            toast.success("Category deleted")
        }catch(err: any) {
            console.log(err)
            toast.error("Make sure you removed all categories usinf this first")
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
               <div className='grid gap-5 mb-5 grid-col-1'>
                   <FormField
                   control={form.control}
                   name='name'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Name:</FormLabel>
                           <FormControl>
                               <Input className='w-[80vw]  block  rounded-md sm:text-sm 
                                 resize-none  overflow-hidden p-2 text-lg outline-none' disabled={loading} placeholder="Category name" {...field}/>
                           </FormControl>
                           <FormMessage />
                       </FormItem>
                   )}
                    />

                <FormField
                   control={form.control}
                   name='billboardId'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Billboard:</FormLabel>
                           <Select 
                           disabled={loading}
                           onValueChange={field.onChange}
                           value={field.value}
                           defaultValue={field.value}
                           >
                               <FormControl>
                                   <SelectTrigger defaultValue={field.value}>
                                       <SelectValue defaultValue={field.value} placeholder="Select a billboard"/>
                                   </SelectTrigger>
                               </FormControl>
                               <SelectContent>
                                   {billboards?.map(billboard => (
                                       <SelectItem
                                       key={billboard.id}
                                       value={billboard.id}
                                       >
                                           {billboard.label}
                                       </SelectItem>
                                   ))}


                               </SelectContent>

                           </Select>
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

export default CategoryForm