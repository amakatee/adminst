import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';

export async function GET (
    req:Request,
    {params} : { params: { sizeId: string}}
) {
    try {
         if(!params.sizeId) {
            return new NextResponse("size id is unknown", {status: 400})
        }

        const size = await prisma.size.findUnique({
            where: {
              id: params.sizeId,
             
            }
          });
        
        return new Response(JSON.stringify(size))



    } catch(err) {
        console.log(`[SIZE_GET]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function PATCH (
    req:Request,
    {params} : { params: {storeId: string, sizeId: string}}
) {
    try {
        const body = await req.json();
    
        const { name, value } = body.data;
        if(!name) {
            return new NextResponse("Name is required", { status: 400})
        }
        if(!value) {
            return new NextResponse("imageUrl is required", { status: 400})
        }
        if(!params.storeId) {
            return new NextResponse("Store id is unknown", {status: 400})
        }
        if(!params.sizeId) {
            return new NextResponse("billboar id is unknown", {status: 400})
        }

      
        const size = await prisma.size.update({
            where: {
              id: params.sizeId,
            },
            data: {
              name,
              value
            }
          });
          return new Response(JSON.stringify(size))
      }


    catch(err) {
        console.log(`[SIZE_PATCH]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE (
    req:Request,
    {params} : { params: {storeId: string, sizeId: string}}
) {
    try {
       
        if(!params.storeId) {
            return new NextResponse("Store id is unknown", {status: 400})
        }
        if(!params.sizeId) {
            return new NextResponse("billboard id is unknown", {status: 400})
        }

        const size = await prisma.size.deleteMany({
            where: {
              id: params.sizeId,
             
            }
          });
        
        return new Response(JSON.stringify(size))



    } catch(err) {
        console.log(`[SIZE_DELETE]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}


