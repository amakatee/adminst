import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';

export async function GET (
    req:Request,
    {params} : { params: { productId: string}}
) {
    try {
       

        if(!params.productId) {
            return new NextResponse("Product id is unknown", {status: 400})
        }

        const product = await prisma.product.findUnique({
            where: {
              id: params.productId,
             
            }
          });
        
        return new Response(JSON.stringify(product))



    } catch(err) {
        console.log(`[PRODUCT_GET]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function PATCH (
    req:Request,
    {params} : { params: {storeId: string, productId: string}}
) {
    try {
        const body = await req.json();
    
        const {name, price, categoryId, sizeId, colorId, images, isArchived, isFeatured} = body.data
        if(!name )  return new NextResponse("Name is required", {status: 400})
        if(!price )  return new NextResponse("Price is required", {status: 400})
        if(!categoryId )  return new NextResponse("CategoryId is required", {status: 400})
        if(!sizeId)  return new NextResponse("Size is required", {status: 400})
        if(!colorId )  return new NextResponse("Color is required", {status: 400})
         

        if(!params.storeId) {
            return new NextResponse("Store id is unknown", {status: 400})
        }
        

      
        const product = await prisma.product.update({
            where: {
              id: params.productId,
            },
            data: {
                name,
                price,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
                categoryId,
                images: {
                  createMany: {
                    data: [
                      ...images.map((image: {url: string}) => image)
                    ]
                  }
                },
                storeId: params.storeId
            }
          });
          return new Response(JSON.stringify(product))
      }


    catch(err) {
        console.log(`[PRODUCT_PATCH]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE (
    req:Request,
    {params} : { params: {storeId: string, productId: string}}
) {
    try {
       
        if(!params.storeId) {
            return new NextResponse("Store id is unknown", {status: 400})
        }
        if(!params.productId) {
            return new NextResponse("billboard id is unknown", {status: 400})
        }

        const product = await prisma.product.deleteMany({
            where: {
              id: params.productId,
             
            }
          });
        
        return new Response(JSON.stringify(product))



    } catch(err) {
        console.log(`[PRODUCT_DELETE]`, err)
        return new NextResponse("Internal Error", {status: 500})
    }
}


