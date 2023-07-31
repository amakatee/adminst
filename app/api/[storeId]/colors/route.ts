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
     const color = await prisma.color.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });
    return new Response(JSON.stringify(color))
      
  } catch(err) {
      console.log('[COLOR_POST]' , err)
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
    const colors = await prisma.color.findMany({
        where: {
          storeId: params.storeId
        }
    })
    return new Response(JSON.stringify(colors))
      
  } catch(err) {
      console.log('[COLORS_GET' , err)
  }

}

