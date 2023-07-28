import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';

export async function GET (
    req:Request,
    {params} : { params: { billboardId: string}}
) {
    try {
       

        if(!params.billboardId) {
            return new NextResponse("billboard id is unknown", {status: 400})
        }

        const billboard = await prisma.billboard.findUnique({
            where: {
              id: params.billboardId,
             
            }
          });
        
        return new Response(JSON.stringify(billboard))



    } catch(err) {
        console.log(`[BILLBOARD_DELETE]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function PATCH (
    req:Request,
    {params} : { params: {storeId: string, billboardId: string}}
) {
    try {
        const body = await req.json();
    
        const { label, imageUrl } = body.data;
        if(!label) {
            return new NextResponse("Name is required", { status: 400})
        }
        if(!imageUrl) {
            return new NextResponse("imageUrl is required", { status: 400})
        }
        if(!params.storeId) {
            return new NextResponse("Store id is unknown", {status: 400})
        }
        if(!params.billboardId) {
            return new NextResponse("billboar id is unknown", {status: 400})
        }

      
        const billboard = await prisma.billboard.update({
            where: {
              id: params.billboardId,
            },
            data: {
              label,
              imageUrl
            }
          });
          return new Response(JSON.stringify(billboard))
      }


    catch(err) {
        console.log(`[BILLBOARD_PATCH]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE (
    req:Request,
    {params} : { params: {storeId: string, billboardId: string}}
) {
    try {
       
        if(!params.storeId) {
            return new NextResponse("Store id is unknown", {status: 400})
        }
        if(!params.billboardId) {
            return new NextResponse("billboard id is unknown", {status: 400})
        }

        const billboard = await prisma.billboard.deleteMany({
            where: {
              id: params.billboardId,
             
            }
          });
        
        return new Response(JSON.stringify(billboard))



    } catch(err) {
        console.log(`[BILLBOARD_DELETE]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}


