import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";

async function GET(req:NextRequest){
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json("tead")
    const data = await db.cart.findFirst({
        where:{userid:session.user.id},
        include:{
            CartItem:{
                include:{
                    item:{
                        select:{
                            name:true,
                            photos:true,
                            price:true,
                            owner:{
                                select:{
                                    name:true
                                }
                            }
                        }
                        
                    }
                }
            }
        }
    })
    return NextResponse.json(data)
}

async function POST(req:NextRequest){
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json("tead")
    const data = await req.json()
    let cart = await db.cart.findFirst({where:{userid:session.user.id}})
    if(!cart)
        cart = await db.cart.create(
        {
            data:{
                userid:session.user.id,
            }
        }
    )
    let item:{cartId:string, itemId:string, quantity:number}[] = []
    for(let i of data.cart){
        item.push({cartId:cart.id, itemId:i.itemId, quantity:i.quantity})
    }
    const da = await db.cartItem.createMany({
        data:item,
        skipDuplicates:true
    })
    return NextResponse.json(da)
}


export {GET, POST}