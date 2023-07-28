"use client"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from '@/components/ui/separator'
import { useRouter, useParams } from "next/navigation"
import {Billboard } from '@prisma/client'
import { BillBoardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"


interface BillBoardClientProps  {
    data: BillBoardColumn[]
}


export const BillboardClient: React.FC<BillBoardClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    console.log(data)
    return(
        <>
        <div className="flex items-center justify-between mb-[2rem]">
           <Heading title={`BillBoards(${data?.length})`} description="Manage"/>
           <Button onClick={() => router.push(`/${params.storeid}/billboards/new`)}> 
               <Plus className="w-4 h-4 mr-2" />
               Add new
           </Button>
        
        </div>
          <Separator />
        <div>
           <DataTable columns={columns} data={data} searchKey="label"/>
        </div>
        </>
    )
}