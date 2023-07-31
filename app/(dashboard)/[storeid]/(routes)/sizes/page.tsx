import { SizeClient } from "./components/client"
import prisma from "@/lib/prismadb"
import {format} from 'date-fns'
import { SizeColumn } from "./components/columns"

export default async function SizesPage({params} : {params: { storeid: string}}) {
    const sizes = await prisma.size.findMany({
        where: {
            storeId: params.storeid
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    const formattedSizes: SizeColumn[] = sizes.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return <div className="flex-col"> 
    <div className="flex-1 p-8 pt-6 space-y">
        <SizeClient data={formattedSizes}/>

    </div>
    </div>

}