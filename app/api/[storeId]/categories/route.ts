import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';


import { NextApiRequest } from 'next';
import { parseSearchParams } from '@clerk/shared';


export async function POST(
    req: Request,{params} : {params: {storeId: string}}
    ) {
  try {
    const body = await req.json()
  

    const {name, billboardId} = body.data
    console.log(params.storeId, billboardId, name)

    if(!name || !billboardId )  return new NextResponse("Data is required", {status: 400})
     if(!params.storeId)  return new NextResponse("Store id is required", {status: 400})
    const category = await prisma.category.create({
        data: {
            name,
            billboardId,
            storeId: params.storeId
        }
    })
    return new Response(JSON.stringify(category))
      
  } catch(err) {
      console.log('[CATEGORY_ERROR' , err)
  }

}

export async function GET(
    req: Request,{params} : {params: {storeId: string}}
    ) {
  try {
    const body = await req.json()

    const {name, billboardId} = body

    if(!name || !billboardId )  return new NextResponse("Data is required", {status: 400})
     if(!params.storeId)  return new NextResponse("Store id is required", {status: 400})
    const category = await prisma.category.findMany({
        where: {
           
            storeId: params.storeId
        }
    })
    return new Response(JSON.stringify(category))
      
  } catch(err) {
      console.log('[CATEGORY_ERROR' , err)
  }

}