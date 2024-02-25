import {NextRequest, NextResponse} from "next/server"
import { getServerSession } from "next-auth/next";
import { db } from "~/server/db"
import {createClient} from "@supabase/supabase-js"
import { env } from "~/env";
import { randomUUID } from "crypto";
import { authOptions } from "~/server/auth";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)

async function GET(req:NextRequest){
  const session = await getServerSession(authOptions)
  if(!session) return NextResponse.json({message:"UnAuthorized"},{status:401})
  const data = await db.items.findMany({
    where:{
      ownerId:session.user.id
    }
  })
  return NextResponse.json(data)
}


async function POST(req:NextRequest){
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json({message:"Session Code"},{status:403})
    const formData = await req.formData()
    const imageUrl = []
    const name = formData.get("name")
    const ownerId = session.user.id
    const rating = formData.get("rating")
    const price = formData.get("price")
    const type = formData.get("type")
    const files = formData.getAll("file")
      for(const file of files){
        console.log(randomUUID())
        const {data,error} = await supabase.storage.from("lifesaver").upload(`/${randomUUID()}`,file)
        if(data)
        imageUrl.push(`${env.SUPABASE_URL}/storage/v1/object/public/${"lifesaver/"+data.path}`)
      }
      if(!name || !ownerId || !rating || !type || !price) return NextResponse.json({message:"Incomplete data"},{status:400}) 
    const response = await db.items.create({
        data:{
            name:name.toString(),
            ownerId:ownerId.toString(),
            rating:parseFloat(rating.toString()),
            type:type.toString(),
            price:parseInt(price.toString()),
            photos:imageUrl,
        }
    })
    console.log("Done")
    return NextResponse.json({message:"Done", response})
}

async function PUT(req:NextRequest){
  const session = await getServerSession(authOptions)
  if(!session) return NextResponse.json({message:"Not Authorized"}, {status:403})
  const formData = await req.formData()
  const imageUrl = []
  const itemID = formData.get("itemID")
  if(!itemID) return NextResponse.json({message:"Item ID not specified"}, {status:400})
  const files = formData.getAll('file')
  const name = formData.get("name")
  const ownerId = session.user.id
  const rating = formData.get("rating")
  const quantity = formData.get("quantity")
  const price = formData.get("price")
  const type = formData.get("type")
  for(const file of files){
    if(typeof file === 'string'){
      imageUrl.push(file)
      
    }else{
      const {data, error} = await supabase.storage.from("lifesaver").upload(`/${randomUUID()}`, file)
      if(data)
        imageUrl.push(`${env.SUPABASE_URL}/storage/v1/object/public/${"lifesaver/"+data.path}`)
    }
  }

  const dataOBJ:{name?:string, rating?:number, price?:number, type?:string, quantity?:number} = {}
  if(formData.has("name") && name){
    Object.assign(dataOBJ, {name:name.toString()})
  }
  if(formData.has("rating") && rating){
    Object.assign(dataOBJ, {rating:parseFloat(rating.toString())})
  }
  if(formData.has("quantity") && quantity){
    Object.assign(dataOBJ, {quantity:parseInt(quantity.toString())})
  }
  if(formData.has("price") && price){
    Object.assign(dataOBJ, {price:parseInt(price.toString())})
  }
  if(formData.has("type") && type){
    Object.assign(dataOBJ, {type:type.toString()})
  }
  if(imageUrl.length>0){
    Object.assign(dataOBJ, {photos:imageUrl})
  }
  console.log(dataOBJ)
  const data = await db.items.update({
    where:{
      id:itemID.toString(),
      ownerId:ownerId
    },
    data:dataOBJ
  })
  return NextResponse.json(data)
}
export {POST, PUT, GET}