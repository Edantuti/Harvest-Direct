

import {Card, CardDescription,CardFooter,CardContent, CardHeader, CardTitle} from "~/components/ui/card"
import { IoMdStar } from "react-icons/io";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import Flour from "~/assets/flour.jpg"

export default function ProductCard(){
 return (   <Card className="w-96">
      <CardHeader>
        <Image src={Flour} alt="life" className="w-full rounded" />
        <CardTitle>Flour</CardTitle>
        <CardDescription>2kg</CardDescription>
      </CardHeader>
      <CardContent>
        <p>From: Farmer name</p>
        <div className="flex text-sm gap-2">
          <p>Rating: </p>
          <span className="flex items-center justify-center gap-2 bg-white w-fit rounded-full px-2 text-black">
            <IoMdStar/>
            4.3
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Buy Now</Button>
      </CardFooter>
    </Card>
 )
}