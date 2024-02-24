"use client"

import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import {Card, CardDescription,CardFooter,CardContent, CardHeader, CardTitle} from "~/components/ui/card"
import { IoMdStar } from "react-icons/io";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import {useState} from "react"
import Flour from "~/assets/flour.jpg"

export default function ProductCard(){
  const [quantity,changeQuantity] = useState<number>(1)
 return (   <Card className="w-72 bg-gradient-to-bl from-black to-neutral-900">
      <CardHeader>
        <Image src={Flour} alt="life" className="w-full rounded" />
        <CardDescription>2kg</CardDescription>
        <CardTitle>Flour</CardTitle>
      </CardHeader>
      <CardContent className="space-y-px">
        <p className="text-sm">From: Farmer name</p>
        <div className="flex text-sm gap-2">
          <p>Rating: </p>
          <span className="flex items-center justify-center gap-1 bg-white w-fit rounded-full px-2 text-black">
            <IoMdStar/>
            4.3
          </span>
        <div className="flex text-sm">
        </div>
          <p>Type: Organic </p>
        </div>
          <p className="flex text-sm">Freshness: &lt; 2weeks</p> 
      </CardContent>
      <CardFooter className="flex gap-4 justify-between">
        
        <Link href="/items/life"><Button className="rounded-full w-20 hover:border-2 hover:border-neutral-600 hover:fill-white hover:bg-neutral-900 group"><FaCartPlus className="group-hover:fill-white"/></Button></Link>
        <span className="flex bg-white rounded-full">
          <Button className="rounded-s-full" onClick={()=>{changeQuantity(quantity+1)}}>+</Button>
          <div className="bg-white text-black flex items-center justify-center">{quantity}</div>
          <Button className="rounded-r-full" onClick={()=>{if(quantity-1<0) return; changeQuantity(quantity-1)}}>-</Button>
          </span>
      </CardFooter>
    </Card>
 )
}