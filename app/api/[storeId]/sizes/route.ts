import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';



export async function POST(
    req: Request,{params} : {params: {storeId: string}}
    ) {
  try {
    const body = await req.json()
    const {name, value} = body.data

    if(!name || !value )  return new NextResponse("Data is required", {status: 400})
    if(!params.storeId)  return new NextResponse("Store id is required", {status: 400})
    const size = await prisma.size.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });
    return new Response(JSON.stringify(size))
      
  } catch(err) {
      console.log('[SIZE_POST]' , err)
  }

}

export async function GET(
    req: Request,
    {params} : {params: {storeId: string}}
    ) {
  try {
    const body = await req.json()

    const {name, value} = body

    if(!name || !value )  return new NextResponse("Data is required", {status: 400})
     if(!params.storeId)  return new NextResponse("Store id is required", {status: 400})
    const sizes = await prisma.size.findMany({
        where: {
          storeId: params.storeId
        }
    })
    return new Response(JSON.stringify(sizes))
      
  } catch(err) {
      console.log('[SIZES_GET' , err)
  }

}

