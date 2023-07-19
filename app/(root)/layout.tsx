import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";

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
            userId
        }

    })
    if(store) {
        redirect(`/${store.id}`)
    }
   
    return (
        <>
        <div>Nav</div>
        {children}
        </>
    )
}