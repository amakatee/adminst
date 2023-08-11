'use client'
import React, { useState } from 'react'
import {Product, Image, Category, Color, Size} from '@prisma/client'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'

import { ImageUpload } from '@/components/ui/image-upload-product'
import Heading from '@/components/ui/heading' 
import { Button} from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import toast from 'react-hot-toast'
import { AlertModal }  from '@/components/modals/alert-modal'
import {Select, SelectContent, SelectTrigger, SelectValue, SelectItem} from  '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'



const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional()
  });
type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormValuesProps {
    initialData: Product & {
        images: Image[];
     }
    categories: Category[];
    colors: Color[];
    sizes: Size[]; 
   
}


const ProdcuctForm: React.FC<ProductFormValuesProps> = ({
    initialData, colors, sizes, categories
}) => {
    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const params = useParams()
    const router = useRouter()

    const title = initialData ? "Edit Product" : "Create new Product"
    const description = initialData ? "Edit a product " : "Add a new Product"
    const toastMessage  = initialData ? "Product succesfully Updated" : "Product succesfully created"
    const action = initialData ? "Update" : "Create"


    const defaultValues = initialData ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
      } : {

        name: '',
        images: [],
        price: 0,
        categoryId: '',
        colorId: '',
        sizeId: '',
        isFeatured: false,
        isArchived: false,
      } 

      const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
      });
 

    const onSubmit = async (data:ProductFormValues) => {
        try{
            console.log(data)
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeid}/products/${params.productId}`, {data})
            } else {
                await axios.post(`/api/${params.storeid}/products`, {data})

            }
            router.refresh()
            router.push(`/${params.storeid}/products`)
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
            await axios.delete(`/api/${params.storeid}/products/${params.productsId}`);
            router.refresh()
            router.push(`/${params.storeId}/products`)
            toast.success("Products deleted")
        }catch(err: any) {
            toast.error("Something went wrong")
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
     
       <div className='flex items-center justify-between ' >
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
           className='w-full my-8 overscroll-x-none'
           onSubmit={form.handleSubmit(onSubmit)}>
               <div className='grid grid-cols-1 gap-8 mb-6 sm:grid-cols-2 '>
                   <FormField
                   control={form.control}
                   name='name'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Name:</FormLabel>
                           <FormControl>
                               <Input className='block p-2 overflow-hidden text-lg rounded-md outline-none resize-none sm:text-sm' disabled={loading} placeholder="Product name" {...field}/>
                           </FormControl>
                           <FormMessage />
                       </FormItem>
                   )}
                    />
                    <FormField
                   control={form.control}
                   name='description'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Description:</FormLabel>
                           <FormControl>
                               <Input className='block p-2 overflow-hidden text-lg rounded-md outline-none resize-none sm:text-sm' disabled={loading} placeholder="Product Description" {...field}/>
                           </FormControl>
                           <FormMessage />
                       </FormItem>
                   )}
                    />
                <FormField
                   control={form.control}
                   name='images'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Upload (Single Image or Video At Once)</FormLabel>
                           <FormControl>
                             <ImageUpload 
                               disabled={loading}
                               onChange={(url) => field.onChange([...field.value, {url}])}
                               onRemove={(url) => field.onChange([...field.value.filter((current) => {
                                   console.log(current.url, url, field.value)
                                 
                                return  current.url !== url
                               })])}
                               value={field.value.map(image => image.url) } 
                             />
                           </FormControl>
                           <FormMessage />
                       </FormItem>

                   )}
                    /> 
                <FormField
                   control={form.control}
                   name='price'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Price:</FormLabel>
                           <FormControl>
                               <Input type="number" className='w-[80vw]  block  rounded-md sm:text-sm 
                            resize-none  overflow-hidden p-2 text-lg outline-none' disabled={loading} placeholder=" 99.99" {...field}/>
                           </FormControl>
                           <FormMessage />
                       </FormItem>
                   )}
                    />
                    <FormField
                   control={form.control}
                   name='categoryId'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Category:</FormLabel>
                           <Select 
                           disabled={loading}
                           onValueChange={field.onChange}
                           value={field.value}
                           defaultValue={field.value}
                           >
                               <FormControl>
                                   <SelectTrigger defaultValue={field.value}>
                                       <SelectValue defaultValue={field.value} placeholder="Select a category"/>
                                   </SelectTrigger>
                               </FormControl>
                               <SelectContent>
                                   {categories?.map(category => (
                                       <SelectItem
                                       key={category.id}
                                       value={category.id}
                                       >
                                           {category.name}
                                       </SelectItem>
                                   ))}
                                </SelectContent>
                            </Select>
                           <FormMessage />
                       </FormItem>
                   )}
                    />

                <FormField
                   control={form.control}
                   name='sizeId'
                   render={({field}) => (
                       <FormItem>
                           <FormLabel>Size:</FormLabel>
                           <Select 
                           disabled={loading}
                           onValueChange={field.onChange}
                           value={field.value}
                           defaultValue={field.value}
                           >
                               <FormControl>
                                   <SelectTrigger defaultValue={field.value}>
                                       <SelectValue defaultValue={field.value} placeholder="Select a size"/>
                                   </SelectTrigger>
                               </FormControl>
                               <SelectContent>
                                   {sizes?.map(size => (
                                       <SelectItem
                                       key={size.id}
                                       value={size.id}
                                       >
                                           {size.name}
                                       </SelectItem>
                                   ))}
                                </SelectContent>
                            </Select>
                           <FormMessage />
                       </FormItem>
                   )}
                    /> 
             <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>{color.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
                    <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Featured
                    </FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Archived
                    </FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
                    {/* <FormField
                   control={form.control}
                   name='isFeatured'
                   render={({field}) => (
                       <FormItem className='flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md'>
                           <FormControl>
                      
                           <Checkbox 
                           checked={field.value}
                           onCheckedChange={field.onChange}
                          />
                          <div className='space-y-1 leading-none'>
                              <FormLabel>
                                  Featured
                              </FormLabel>
                              <FormDescription>
                                  Tris product will appear on the home page
                              </FormDescription>

                          </div>
                           </FormControl>

                           
                           
                       </FormItem>
                   )}
                    /> */}

                   

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

export default ProdcuctForm