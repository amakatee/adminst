import prisma from "@/lib/prismadb"
import ProductForm from "./components/product-form"


export default async function ProductPage ({
    params
} : {
    params: { productId: string, storeid: string}
}) {
    console.log(params)
    const product = await prisma.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true,
            
        }
    })

    const categories = await prisma.category.findMany({
        where: {
            storeId: params.storeid
        },
        
    })
    const sizes = await prisma.size.findMany({
        where: {
            storeId: params.storeid
        }
    })
    const colors = await prisma.color.findMany({
        where: {
            storeId: params.storeid
        }
    })
    return (
        <div className="flex-col ">
            <div className="flex-1 p-8 pr-6 ">
                <ProductForm
                 categories={categories}
                 sizes={sizes}
                 colors={colors}
                 initialData={product as any}/>
            </div> 
          
        </div>
    )
}