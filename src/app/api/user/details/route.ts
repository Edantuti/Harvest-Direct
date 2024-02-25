import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";

async function POST(req:NextRequest){
    const session  = await getServerSession(authOptions)
    if(!session) return NextResponse.json({message:"UnAuthorized"},{status:403})
    const data = await req.json();
    const response = await db.user.update({
        where:{
            id:session.user.id
        },
        data:data,
    })
    return NextResponse.json({message:"Updated Successfully"})
}

export {POST}