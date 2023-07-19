import React, { useEffect, useState } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";


import Navbar from "@/components/navbar";

export default async function DashBoardLayout({
    children, 
    params
} : { 
    children: React.ReactNode
    params: {storeId: string}
}) {
  
    const { userId } = auth()
    if(!userId) {
        redirect('/sign-in')
    }


    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }

    })

    const stores = await prisma.store.findMany({
        where: {
          userId,
    
        }
      })
     

    if(!store) {
        redirect(`/`)
    }
   
    return (
        <>
        <Navbar stores={stores}/>
        {children}
        </>
    )
}