import prisma from "@/lib/prismadb"
import CategoryForm from "./components/category-form"


export default async function CategoryPage ({
    params
} : {
    params: { categoryId: string}
}) {
    const category = await prisma.category.findUnique({
        where: {
            id: params.categoryId
        }
    })
    return (
        <div className="flex-col ">
            <div className="flex-1 p-8 pr-6 ">
                <CategoryForm  initialData={category}/>
            </div> 
          
        </div>
    )
}