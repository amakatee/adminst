"use client"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from '@/components/ui/separator'
import { useRouter, useParams } from "next/navigation"
import {Billboard } from '@prisma/client'
import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface OrderClientProps  {
    data: OrderColumn[]
}


export const OrderClient: React.FC<OrderClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()

    return(
        <>
        <div className="flex items-center justify-between mb-[2rem]">
           <Heading title={`Orders(${data?.length})`} description="Manage Orders"/>
        </div>
          <Separator />
        <div>
           <DataTable columns={columns} data={data} searchKey="products"/>
        </div>
      
        </>
    )
}