import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';


import { NextApiRequest } from 'next';
import { parseSearchParams } from '@clerk/shared';


export async function POST(
    req: Request,{params} : {params: {storeId: string}}
    ) {
  try {
    const body = await req.json()
  

    const {name, price, categoryId, sizeId, colorId, images, isArchived, isFeatured} = body.data


    if(!name )  return new NextResponse("Name is required", {status: 400})
    if(!price )  return new NextResponse("Price is required", {status: 400})
    if(!categoryId )  return new NextResponse("CategoryId is required", {status: 400})
    if(!sizeId)  return new NextResponse("Size is required", {status: 400})
    if(!colorId )  return new NextResponse("Color is required", {status: 400})
    if( !images || !images.length) {
      return new NextResponse("Images are required" ,{status: 400})
    }




     if(!params.storeId)  return new NextResponse("Store id is required", {status: 400})
    const product = await prisma.product.create({
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
    })
    return new Response(JSON.stringify(product))
      
  } catch(err) {
      console.log('[PRODUCT_POST]' , err)
  }

}

export async function GET(
    req: Request,{params} : {params: {storeId: string}}
    ) {
  try {
    const body = await req.json()

    const {name, price, categoryId, sizeId, colorId, images, isArchived, isFeatured} = body

    if(!name || !price )  return new NextResponse("Data is required", {status: 400})
     if(!params.storeId)  return new NextResponse("Store id is required", {status: 400})
    const products = await prisma.product.findMany({
        where: {
           
            storeId: params.storeId
        }
    })

    console.log(products)
    return new Response(JSON.stringify(products))
      
  } catch(err) {
      console.log('[PRODUCTS_GET' , err)
  }

}