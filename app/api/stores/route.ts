import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';


import { NextApiRequest } from 'next';


export async function POST(req: Request, request: NextApiRequest) {
    const {name, userId} = await req.json()

    if(!name || !userId )  return new NextResponse("Data is required", {status: 400})
   
    const store = await prisma.store.create({
        data: {
            name: name,
            userId: userId
        }
    })
    return new Response(JSON.stringify(store))

}