"use client"
import React, {useState} from "react"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"

import { 
    DropdownMenu,
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuTrigger, 
    DropdownMenuItem,

} from "@/components/ui/dropdown-menu"
import { BillBoardColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { AlertModal } from "@/components/modals/alert-modal"


 

interface CellActionProps {
    data: BillBoardColumn
}
export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    const [ loading, setLoading ]= useState(false)
    const [ open, setOpen ] = useState(false)


    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Id copied succesfully")
    }

    const onDelete = async () => {
        try{
            console.log(data)
            setLoading(true)
            await axios.delete(`/api/${params.storeid}/billboards/${data.id}`);
            router.refresh()
            toast.success("BillBoard deleted")
        }catch(err: any) {
            console.log(err)
            toast.error("Make sure you removed all categories usinf this billboard first")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }
    

    return <>
    <AlertModal 
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
       />
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open Menu</span>
                < MoreHorizontal /> 
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push(`/${params.storeid}/billboards/${data.id}`)}>
                <Edit className="w-4 h-4 mr-2" />
                Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCopy(data.id)}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="w-4 h-4 mr-2" />
                Delete
            </DropdownMenuItem>


        </DropdownMenuContent>

    </DropdownMenu>
    </>
}