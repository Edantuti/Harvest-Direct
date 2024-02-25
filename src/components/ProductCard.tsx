"use client"

import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import {Card, CardDescription,CardFooter,CardContent, CardHeader, CardTitle} from "~/components/ui/card"
import { IoMdStar } from "react-icons/io";
import Image from "next/image";

import { Button } from "~/components/ui/button";

export default function ProductCard({id,name,type,photos,rating, owner}:any){
  
 return (   <Card className="w-72 bg-gradient-to-bl from-black to-neutral-900 row-span-1">
      <CardHeader>
        <Image src={photos[0]} alt="life" className="aspect-square object-cover rounded" width={400} height={400} />
        <CardDescription></CardDescription>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-px">
        <p className="text-sm flex items-center">From: <span className="text-xs text-neutral-300">{owner.name}</span></p>
        <div className="flex text-sm gap-2">
          <p>Rating: </p>
          <span className="flex items-center justify-center gap-1 bg-white w-fit rounded-full px-2 text-black">
            <IoMdStar/>
            {rating}
          </span>
          </div>
        <div className="flex text-sm">
          <p>Type: {type}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href={`/items/${id}`} className="w-full mt-10">
          <Button className="w-full rounded-full hover:border-2 hover:border-neutral-600 hover:fill-white hover:bg-neutral-900 group"><FaCartPlus className="group-hover:fill-white w-10"/></Button>
          </Link>
      </CardFooter>
    </Card>
 )
}