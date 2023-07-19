'use client'
import { useStoreModal } from '@/hooks/use-store-modal'
import {Store} from '@prisma/client'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Check, PlusCircle } from 'lucide-react'
import { ChevronsUpDown, Store as StoreIcon } from 'lucide-react'



import {PopoverTrigger, Popover, PopoverContent} from './ui/popover'
import {Button} from './ui/button'
import { cn } from '@/lib/utils'
import {CommandList, Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandSeparator} from '../components/ui/command'

 
type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

export default function StoreSwitcher({
    className,
    items = []
} : StoreSwitcherProps) {
    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()
    const formattedItems = items.map(item => ({
        label: item.name,
        value: item.id
    }))

    const currentStore = formattedItems.find(item => item.value === params.storeid)
   
    const [open, setOpen] = useState(false)
    const onStoreSelect = (store: { value: string, label: string}) => {
        setOpen(false)
        router.push(`/${store.value}`)

    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                size="sm"
                aria-expanded={open}
                aria-label= "Select a store"
                className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className='w-4 h-4 mr-2' />
                    {currentStore?.label}
                    <ChevronsUpDown className='w-4 h-4 ml-auto opacity-50 shrink-0' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store" />
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading="Stores" >
                            {formattedItems.map(store => (
                                <CommandItem
                                key={store.value}
                                onSelect={() => onStoreSelect(store)}
                                className="text-sm"
                                >
                                    <StoreIcon className='w-4 h-4 mr-2' />
                                    {store.label}
                                    <Check 
                                    className={cn("ml-auto h4 w-4", 
                                    currentStore?.value === store.value ? "opacity-100" : "opacity-0")}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                            onSelect={() => {
                                setOpen(false)
                                storeModal.onOpen()
                            }}
                            >
                                <PlusCircle className='w-5 h-5 mr-2'/>
                                Create Store

                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
         </Popover>
    )
}