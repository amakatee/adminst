import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';


import { NextApiRequest } from 'next';
import { parseSearchParams } from '@clerk/shared';


export async function POST(
    req: Request,{params} : {params: {storeId: string}}
    ) {
  try {
    const body = await req.json()
  

    const {label, imageUrl} = body.data
    console.log(params.storeId, imageUrl, label)

    if(!label || !imageUrl )  return new NextResponse("Data is required", {status: 400})
     if(!params.storeId)  return new NextResponse("Store id is required", {status: 400})
    const billboard = await prisma.billboard.create({
        data: {
            label,
            imageUrl,
            storeId: params.storeId
        }
    })
    return new Response(JSON.stringify(billboard))
      
  } catch(err) {
      console.log('[BILLBOARD_ERROR' , err)
  }

}

export async function GET(
    req: Request,{params} : {params: {storeId: string}}
    ) {
  try {
    const body = await req.json()

    const {label, imageUrl} = body

    if(!label || !imageUrl )  return new NextResponse("Data is required", {status: 400})
     if(!params.storeId)  return new NextResponse("Store id is required", {status: 400})
    const billboards = await prisma.billboard.findMany({
        where: {
           
            storeId: params.storeId
        }
    })
    return new Response(JSON.stringify(billboards))
      
  } catch(err) {
      console.log('[BILLBOARD_ERROR' , err)
  }

}