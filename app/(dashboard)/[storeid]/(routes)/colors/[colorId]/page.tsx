import prisma from "@/lib/prismadb"
import SizeForm from "./components/color-form"


export default async function ColorPage ({
    params
} : {
    params: { colorId: string}
}) {
    const color = await prisma.color.findUnique({
        where: {
            id: params.colorId
        }
    })
    return (
        <div className="flex-col ">
            <div className="flex-1 p-8 pr-6 ">
                <SizeForm  initialData={color}/>
            </div> 
          
        </div>
    )
}