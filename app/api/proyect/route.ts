import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req :Request) {
    try{
        const {userId} = auth();
        const data = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const proyects = await db.proyects.create({
            data: {
                userId,
                ...data,
            },
        });
        
        return NextResponse.json (proyects);

    }catch(error){
        console.log ("[PROYECTOS]",error);
        return new NextResponse("Internal Errorfdssf", {status: 500});
    }
}