import prisma from "@/lib/prismadb"
import BillboardForm from "./components/billboard-form"


export default async function BillBoarsPage ({
    params
} : {
    params: { billboardId: string}
}) {
    const billboard = await prisma.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })
    return (
        <div className="flex-col ">
            <div className="flex-1 p-8 pr-6 ">
                <BillboardForm  initialData={billboard}/>
            </div> 
          
        </div>
    )
}