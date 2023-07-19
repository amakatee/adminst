import { auth, UserButton } from "@clerk/nextjs"
import { MainNav } from "./main-nav"
import StoreSwitcher from "./store-switcher"
import { redirect } from 'next/navigation'
import prisma from '../lib/prismadb'
import {Store } from '@prisma/client'

type Stores = {
  stores: Store[]
}

const Navbar =  ({stores} : Stores ) => {
  // const { userId } = auth()
  // if(!userId) {
  //   redirect("/sign-in")
  // }
  // const stores = await prisma.store.findMany({
  //   where: {
  //     userId,

  //   }
  // })
  return (
    <div className="border-b">
        <div className="flex items-center h-16 px-4">
            <StoreSwitcher items={stores}  />
            <MainNav className="mx-6"/>
            <div className="flex items-center ml-auto space-x-4">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    </div>
  )
}

export default Navbar