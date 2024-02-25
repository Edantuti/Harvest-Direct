import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";

async function GET(req:NextRequest){
    const query = req.nextUrl.searchParams
    const searchObj:{id?:string | null, name?:{search?: string| null}, type?:string |null, owner?:{name?:{search:string |null}}} = {}
    if(query.get("id")){
        searchObj.id = query.get("id")
    }
    if(query.get("search")){
        searchObj.name = {search:query.get("search")}
    }
    if(query.get("type")){
        searchObj.type = query.get("type")
    }
    if(query.get("farmer")){
        //@ts-ignore
        searchObj.owner = {name:{search:query.get("farmer").replace(" ","\\ ")}}
    }
    const data = await db.items.findMany({
        //@ts-ignore
        where:searchObj,
        include:{
            owner:{
                select:{
                    name:true
                }
            }
        }
    })
    return NextResponse.json(data)
}


export {GET}