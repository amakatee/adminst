import { ProductsClient } from "./components/client"
import prisma from "@/lib/prismadb"
import {format} from 'date-fns'
import { ProductColumn } from "./components/columns"
import { formatter } from "@/lib/utils"

export default async function ProductsPage({params} : {params: { storeId: string}}) {
    console.log(params)
    const products = await prisma.product.findMany({
        where: {
          storeId: params.storeId
        },
        include: {
          category: true,
          size: true,
          color: true,
       
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      console.log(products)
      const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
       
      }));

    return <div className="flex-col"> 
    <div className="flex-1 p-8 pt-6 space-y">
        <ProductsClient data={formattedProducts}/>

    </div>
    </div>

}