import { getServerSession } from "next-auth";
import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";

async function GET(req:NextRequest){
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json({
        message:"BAKA YAARO, You are Not Authorized"
    })
    const data = await db.orders.findMany({
        where:{userId:session.user.id},
        include:{
            ItemOrder:{
                select:{
                    item:true
                }
            },
        }
    })
    console.log(data)
    return NextResponse.json(data)
}
async function POST(req:NextRequest){
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json({message:"Unauthorized"}, {status:400})
    const result = await db.$transaction(async (t)=>{
        const cart = await t.cart.findFirst({
            where:{
                userid:session.user.id
            }
        })
        
        if(!cart) throw "No Cart for the User"
        const cartItem = await t.cartItem.findMany({
            where:{
                cartId:cart.id
            },
            include:{
                item:true
            }
        })
        let total = 0;
        const items:{orderId:string, itemId:string}[] = []
        for(const it of cartItem){
            console.log(it.item.price)
            console.log(it.quantity)
            total+=it.item.price*it.quantity
            const item = await t.items.findUnique({
                where:{
                    id:it.item.id
                }
            })
            if(!item) throw "Item not found"
            await t.items.update({
                where:{
                    id:it.item.id,
                },
                data:{
                    quantity:(item.quantity-it.quantity)
                }
            })
        }
        const order = await t.orders.create({
            data:{userId:session.user.id, total:total}
        })
        for(const it of cartItem){
           items.push({orderId:order.id,itemId:it.item.id}) 
        }
        
        await t.itemOrder.createMany({
            data:items
        })
        
        await t.cart.delete({
            where:{
                id:cart.id
            }
        })
        return await t.itemOrder.findMany({where:{orderId:order.id},include:{item:true}})
        })

    return NextResponse.json(result)
}
async function PUT(req:NextRequest){

}

export {GET,POST,PUT}