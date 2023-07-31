import { ColorClient } from "./components/client"
import prisma from "@/lib/prismadb"
import {format} from 'date-fns'
import { ColorColumn } from "./components/columns"

export default async function ColorsPage({params} : {params: { storeid: string}}) {
    const colors = await prisma.color.findMany({
        where: {
            storeId: params.storeid
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    const formattedColors: ColorColumn[] = colors.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return <div className="flex-col"> 
    <div className="flex-1 p-8 pt-6 space-y">
        <ColorClient data={formattedColors}/>

    </div>
    </div>

}