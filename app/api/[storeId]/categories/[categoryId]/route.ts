import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';

export async function GET (
    req:Request,
    {params} : { params: { categoryId: string}}
) {
    try {
       

        if(!params.categoryId) {
            return new NextResponse("Category id is unknown", {status: 400})
        }

        const categories = await prisma.category.findUnique({
            where: {
              id: params.categoryId,
             
            },
            include: {
                billboard: true
            }
          });
        
        return new Response(JSON.stringify(categories))



    } catch(err) {
        console.log(`[Categorie_GET]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function PATCH (
    req:Request,
    {params} : { params: {storeId: string, categoryId: string}}
) {
    try {
        const body = await req.json();
    
        const { name, billboardId } = body.data;
        if(!name) {
            return new NextResponse("Name is required", { status: 400})
        }
        if(!billboardId) {
            return new NextResponse("bb is required", { status: 400})
        }
        if(!params.storeId) {
            return new NextResponse("Store id is unknown", {status: 400})
        }
       

      
        const category = await prisma.category.update({
            where: {
              id: params.categoryId,
            },
            data: {
              name,
              billboardId
            }
          });
          return new Response(JSON.stringify(category))
      }


    catch(err) {
        console.log(`[CATEGORY_PATCH]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE (
    req:Request,
    {params} : { params: {storeId: string, categoryId: string}}
) {
    try {
       
        if(!params.storeId) {
            return new NextResponse("Store id is unknown", {status: 400})
        }
        if(!params.categoryId) {
            return new NextResponse("billboard id is unknown", {status: 400})
        }

        const category = await prisma.category.deleteMany({
            where: {
              id: params.categoryId,
             
            }
          });
        
        return new Response(JSON.stringify(category))



    } catch(err) {
        console.log(`[CATEGORY_DELETE]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}


