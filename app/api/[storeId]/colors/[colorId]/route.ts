import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';

export async function GET (
    req:Request,
    {params} : { params: { colorId: string}}
) {
    try {
         if(!params.colorId) {
            return new NextResponse("color id is unknown", {status: 400})
        }

        const color = await prisma.color.findUnique({
            where: {
              id: params.colorId,
             
            }
          });
        
        return new Response(JSON.stringify(color))



    } catch(err) {
        console.log(`[COLOR_GET]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function PATCH (
    req:Request,
    {params} : { params: {storeId: string, colorId: string}}
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
        if(!params.colorId) {
            return new NextResponse("billboar id is unknown", {status: 400})
        }

      
        const color = await prisma.color.update({
            where: {
              id: params.colorId,
            },
            data: {
              name,
              value
            }
          });
          return new Response(JSON.stringify(color))
      }


    catch(err) {
        console.log(`[COLOR_PATCH]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE (
    req:Request,
    {params} : { params: {storeId: string, colorId: string}}
) {
    try {
       
        if(!params.storeId) {
            return new NextResponse("Store id is unknown", {status: 400})
        }
        if(!params.colorId) {
            return new NextResponse("billboard id is unknown", {status: 400})
        }

        const color = await prisma.color.deleteMany({
            where: {
              id: params.colorId,
             
            }
          });
        
        return new Response(JSON.stringify(color))



    } catch(err) {
        console.log(`[COLOR_DELETE]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}


