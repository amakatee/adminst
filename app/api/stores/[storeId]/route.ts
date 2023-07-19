import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';
export async function PATCH (
    req:Request,
    {params} : { params: {storeId: string}}
) {
    try {
       
        const body = await req.json()
        const { data: {name}, userId } = body

        if(!name) {
            return new NextResponse("Name is required", { status: 400})
        }
        if(!params.storeId) {
            return new NextResponse("Store id is unknown", {status: 400})
        }

        const store = await prisma.store.updateMany({
            where: {
                id: params.storeId,
                userId
                
            },
             data: {
                name
            }
        })
        return new Response(JSON.stringify(store))


    } catch(err) {
        console.log(`[STORE_PATCH]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE (
    req:Request,
    {params} : { params: {storeId: string}}
) {
    try {
       
        if(!params.storeId) {
            return new NextResponse("Store id is unknown", {status: 400})
        }

        const store = await prisma.store.deleteMany({
            where: {
              id: params.storeId,
             
            }
          });
        
        return new Response(JSON.stringify(store))



    } catch(err) {
        console.log(`[DELETE_PATCH]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}
