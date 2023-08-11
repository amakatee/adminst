import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';


import { NextApiRequest } from 'next';
import { parseSearchParams } from '@clerk/shared';


export async function POST(
    req: Request,{params} : {params: {storeId: string}}
    ) {
  try {
    const body = await req.json()
  

    const {name, description, price, categoryId, sizeId, colorId, images, isArchived, isFeatured} = body.data


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
            description,
            price,
            colorId,
            sizeId,
            isFeatured,
            isArchived,
            categoryId,
            images: {
              createMany: {
                data: [
                  ...images.map((image: { url: string }) => image),
                ],
              },
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
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return new Response(JSON.stringify(products))
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};