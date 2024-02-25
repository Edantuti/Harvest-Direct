"use client"
import HeaderProduct from "~/components/HeaderProduct"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table"
import { Button } from "~/components/ui/button"
import useSWR from "swr"
import { fetcher } from "../items/page"
import { IoTrashBin } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa"
import { useRouter } from "next/navigation"

const getUserCart = ()=>{
    const {data, error, isLoading} = useSWR('api/user/cart', fetcher)
    let value = 0;
    if(isLoading) return {isLoading}
    console.log(data)
    if(data && data.CartItem)
    for(let items of data.CartItem){
        value+=items.quantity*items.item.price;
    }
    return {data,error,isLoading, value}
}

export default function CartPage(){
    const {data, isLoading, value} = getUserCart()
    const router = useRouter()
    async function placeOrder(){
        try{
        const data = await fetch('api/user/orders', {
            method:"POST"
        })
        }catch(error){
            console.error(error)
        }
        
        console.log(data)
        router.refresh()
    }
    return (
        <>
            <HeaderProduct/>
            <section>
                {!isLoading && <Table>
                    <TableCaption>List of items in the Cart.</TableCaption>
                     <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px] text-center">Item Image</TableHead>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-center">Merchant/Farmer</TableHead>
                            <TableHead className="text-center">Amount</TableHead>
                            <TableHead className="text-center">Delete?</TableHead>
                        </TableRow>
                     </TableHeader>
                    <TableBody>
                        
                        {data && data.CartItem.map((obj:any,index:number)=>{
                            return(<CartItemRow key={obj.itemId} id={obj.itemId} image_url={obj.item.photos[0]} name={obj.item.name} quantity={obj.quantity} farmer_name={obj.item.owner.name} price={obj.item.price} />)
                        })}
                        <TableRow>
                            <TableCell className="text-center">Total Cost</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-center">₹{value}</TableCell>
                            <TableCell className="text-center"><Button onClick={()=>placeOrder()}>Checkout <FaArrowRight/></Button> </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>}
            </section>
        </>
    )
}

const CartItemRow = ({id, image_url, name, quantity, farmer_name, price}:{id:string,image_url:string|StaticImageData, name:string, quantity:number, farmer_name:string, price:number})=>{
    return (
    <TableRow>
      <TableCell className=""><Image src={image_url} alt="flour" className="rounded" width={400} height={10} /></TableCell>
      <TableCell className="text-center"><Link href={`/items/${id}`}>{name}</Link></TableCell>
      <TableCell className="text-center">
        <div className="">{quantity}</div>        
      </TableCell>
      <TableCell className="text-center">{farmer_name}</TableCell>
      <TableCell className="text-center">₹{price}</TableCell>
      <TableCell className="text-center"><Button size={"icon"} className="bg-red-700 hover:bg-red-600 transition-colors"><IoTrashBin /></Button></TableCell>
    </TableRow>
    )
}