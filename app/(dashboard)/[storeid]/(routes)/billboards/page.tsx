import { BillboardClient } from "./components/client"
import prisma from "@/lib/prismadb"
import {format} from 'date-fns'
import { BillBoardColumn } from "./components/columns"

export default async function BillBoarsPage({params} : {params: { storeid: string}}) {
    const billboards = await prisma.billboard.findMany({
        where: {
            storeId: params.storeid
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    const formattedBillBoards: BillBoardColumn[] = billboards.map(item => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return <div className="flex-col"> 
    <div className="flex-1 p-8 pt-6 space-y">
        <BillboardClient data={formattedBillBoards}/>

    </div>
    </div>

}