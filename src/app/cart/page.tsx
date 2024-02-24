"use client"
import HeaderProduct from "~/components/HeaderProduct"
import {useState} from "react"
import Image, { StaticImageData } from "next/image"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table"
import { Button } from "~/components/ui/button"
import Flour from "~/assets/flour.jpg"

export default function CartPage(){
    return (
        <>
            <HeaderProduct/>
            <section>
                <Table>
                    <TableCaption>List of items in the Cart.</TableCaption>
                     <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px] text-center">Item Image</TableHead>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-center">Merchant/Farmer</TableHead>
                            <TableHead className="text-center">Amount</TableHead>
                        </TableRow>
                     </TableHeader>
                    <TableBody>
                        <CartItem image_url={Flour} name={"Flour"} quantity={4} farmer_name="Testing" price={400} />
                        <CartItem image_url={Flour} name={"Flour"} quantity={4} farmer_name="Testing" price={400} />
                        <CartItem image_url={Flour} name={"Flour"} quantity={4} farmer_name="Testing" price={400} />
                    </TableBody>
                </Table>
            </section>
        </>
    )
}

const CartItem = ({image_url, name, quantity, farmer_name, price}:{image_url:string|StaticImageData, name:string, quantity:number, farmer_name:string, price:number})=>{
    const [quan, changeQuan] = useState<number>(quantity);
    return (
    <TableRow>
      <TableCell className=""><Image src={image_url} alt="flour" className="rounded" /></TableCell>
      <TableCell className="text-center">{name}</TableCell>
      <TableCell>
          <span className="flex bg-white rounded-full w-24 items-center justify-center">
            <Button className="rounded-s-full" onClick={()=>{changeQuan(quan+1)}}>+</Button>
              <div className="bg-white text-black flex items-center justify-center">{quan}</div>
            <Button className="rounded-r-full" onClick={()=>{if(quan-2<0) return; changeQuan(quan-1)}}>-</Button>
         </span>
      </TableCell>
      <TableCell className="text-center">{farmer_name}</TableCell>
      <TableCell className="text-center">₹{price}</TableCell>
    </TableRow>
    )
}