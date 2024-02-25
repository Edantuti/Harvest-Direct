"use client"

import Image from "next/image";
import {useState} from "react"
import HeaderProduct from "~/components/HeaderProduct";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import Flour from "~/assets/flour.jpg"
import { FaCheck } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "~/lib/utils"

export default function ItemPage(

){
    const params = useParams()
    const {data, error, isLoading} = useSWR(`/api/item?id=${params.item}`, fetcher)
    const [quantity, changeQuantity] = useState<number>(1)
    async function pushToCart(id:string){
        const d = await fetch('/api/user/cart', {
            method:"POST",
            body:JSON.stringify({cart:[{itemId:id, quantity:quantity}]})
            })
        console.log(d)
    }
    return (
        <>
            <HeaderProduct />
            {!isLoading && <section className="mx-auto w-[1200px] space-y-10">
                <div className="ml-20 flex gap-20">
                    <Carousel className="w-[30rem]">
                        <CarouselContent>
                                {data[0].photos.map((url:string,index:number) => (
                                    <CarouselItem key={index}>
                                        <Image src={url} alt="flour" className="rounded" width={500} height={500}/>
                                     </CarouselItem>
                                ))}
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                    <div className="my-8">
                       <h2 className="text-3xl my-2">{data[0].name}</h2> 
                       <p className="text-sm text-slate-400">From: <span className="text-slate-200">{data[0].owner.name}</span></p>
                       <p className="text-sm text-slate-400">Rating: <span className="text-slate-200">{data[0].rating}</span></p>
                       <p className="text-sm text-slate-400">Type: <span className="text-slate-200">{data[0].type}</span></p>
                       <div className="space-y-4 mt-10">
                           {data[0].quantity>0 && <span className="flex bg-white rounded-full w-24 items-center justify-center">
                                <Button className="rounded-s-full" onClick={()=>{if(quantity+1>data[0].quantity) return; changeQuantity(quantity+1)}}>+</Button>
                                    <div className="bg-white text-black flex items-center justify-center">{quantity}</div>
                                <Button className="rounded-r-full" onClick={()=>{if(quantity-2<0) return; changeQuantity(quantity-1)}}>-</Button>
                            </span>}
                            {data[0].quantity===0 && <span>Out Of Stock</span>}
                        <Button className="rounded-full w-24 hover:border-2 hover:border-neutral-600 hover:fill-white hover:bg-neutral-900 group " onClick={()=>pushToCart(data[0].id)}><FaCartPlus className="group-hover:fill-white w-10"/></Button> 
                       </div>
                    </div>
                </div>
                {!isLoading && data[0].description.size>0 && <div className="my-4 ml-20 w-[600px] space-y-2">
                    <h3 className="text-2xl">Product Description</h3>
                    {data[0].description.map((para:string, index:number)=>(
                        <p key={para}>{para}</p>
                    ))}
                </div>}
                {!isLoading && data[0].details.length>0 && <div className="my-4 ml-20 w-[600px] space-y-2">
                    <h3 className="text-2xl">Details</h3>
                    <div className="flex gap-2 text-xs ">
                        {data[0].details.map((detail:string, index:number)=>(
                            <DetailTag key={detail} content={detail} />
                        ))}    
                    </div>
                </div>}
            </section>}
        </>
    )
}

const DetailTag = ({content}:{content:string})=>{
    return (
        <span className="bg-neutral-800 py-2 px-4 rounded-full flex w-fit items-center gap-2">{content} <FaCheck /></span>
    )
}