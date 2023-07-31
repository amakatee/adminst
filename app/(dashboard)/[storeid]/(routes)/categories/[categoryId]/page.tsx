import prisma from "@/lib/prismadb"
import CategoryForm from "./components/category-form"


export default async function CategoryPage ({
    params
} : {
    params: { categoryId: string, storeid: string}
}) {
    const category = await prisma.category.findUnique({
        where: {
            id: params.categoryId
        }
    })

    const billboards = await prisma.billboard.findMany({
        where: {
            storeId: params.storeid
        }
    })
    return (
        <div className="flex-col ">
            <div className="flex-1 p-8 pr-6 ">
                <CategoryForm billboards={billboards} initialData={category}/>
            </div> 
          
        </div>
    )
}