"use client"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from '@/components/ui/separator'
import { useRouter, useParams } from "next/navigation"
import {Billboard } from '@prisma/client'
import { ColorColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface ColorClientProps  {
    data: ColorColumn[]
}


export const ColorClient: React.FC<ColorClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()

    return(
        <>
        <div className="flex items-center justify-between mb-[2rem]">
           <Heading title={`Colors(${data?.length})`} description="Manage colors"/>
           <Button onClick={() => router.push(`/${params.storeid}/colors/new`)}> 
               <Plus className="w-4 h-4 mr-2" />
               Add
           </Button>
        
        </div>
          <Separator />
        <div>
           <DataTable columns={columns} data={data} searchKey="name"/>
        </div>
        <Heading  title="API" description="Api calls for Colors"/>
        <Separator />
        <ApiList entityName="colors" entityIdName="colorId" />
        </>
    )
}