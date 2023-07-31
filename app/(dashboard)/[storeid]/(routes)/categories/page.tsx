import { CategoryClient } from "./components/client"
import prisma from "@/lib/prismadb"
import {format} from 'date-fns'
import { CategoryColumn } from "./components/columns"

export default async function CategiriesPage({params} : {params: { storeid: string}}) {
    const categories = await prisma.category.findMany({
        where: {
            storeId: params.storeid
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    const formattedCategories: CategoryColumn[] = categories.map(item => ({
        id: item.id,
        billboardLabel: item.billboard.label,
        name: item.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return <div className="flex-col"> 
    <div className="flex-1 p-8 pt-6 space-y">
        <CategoryClient data={formattedCategories}/>

    </div>
    </div>

}