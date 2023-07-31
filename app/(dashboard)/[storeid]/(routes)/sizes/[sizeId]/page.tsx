import prisma from "@/lib/prismadb"
import SizeForm from "./components/size-form"


export default async function SizePage ({
    params
} : {
    params: { sizeId: string}
}) {
    const size = await prisma.size.findUnique({
        where: {
            id: params.sizeId
        }
    })
    return (
        <div className="flex-col ">
            <div className="flex-1 p-8 pr-6 ">
                <SizeForm  initialData={size}/>
            </div> 
          
        </div>
    )
}