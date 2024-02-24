"use client"

import Image from "next/image";
import {useState} from "react"
import HeaderProduct from "~/components/HeaderProduct";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import Flour from "~/assets/flour.jpg"
import { FaCheck } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { FaCartPlus } from "react-icons/fa";

export default function ItemPage(){
    const [quantity, changeQuantity] = useState<number>(1)
    return (
        <>
            <HeaderProduct />
            <section className="mx-auto w-[1200px] space-y-10">
                <div className="ml-20 flex gap-20">
                    <Carousel className="w-[30rem]">
                        <CarouselContent>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <Image src={Flour} alt="flour" className="rounded"/>
                                     </CarouselItem>
                                ))}
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                    <div className="my-8">
                       <h2 className="text-3xl my-2">Flour</h2> 
                       <p className="text-sm text-slate-400">From: <span className="text-slate-200">Farmer Name</span></p>
                       <p className="text-sm text-slate-400">Rating: <span className="text-slate-200">4.3</span></p>
                       <p className="text-sm text-slate-400">Freshness: <span className="text-slate-200">&lt; 2 weeks</span></p>
                       <p className="text-sm text-slate-400">Type: <span className="text-slate-200">Organic</span></p>
                       <div className="space-y-4 mt-10">
                           <span className="flex bg-white rounded-full w-24 items-center justify-center">
                                <Button className="rounded-s-full" onClick={()=>{changeQuantity(quantity+1)}}>+</Button>
                                    <div className="bg-white text-black flex items-center justify-center">{quantity}</div>
                                <Button className="rounded-r-full" onClick={()=>{if(quantity-2<0) return; changeQuantity(quantity-1)}}>-</Button>
                            </span>
                        <Button className="rounded-full w-24 hover:border-2 hover:border-neutral-600 hover:fill-white hover:bg-neutral-900 group "><FaCartPlus className="group-hover:fill-white"/></Button> 
                       </div>
                    </div>
                </div>
                <div className="my-4 ml-20 w-[600px] space-y-2">
                    <h3 className="text-2xl">Product Description</h3>
                    <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae atque ex dolore incidunt maxime, architecto reprehenderit rerum doloribus et reiciendis, aspernatur quo tempora necessitatibus asperiores tenetur odit consequuntur est animi?</p>
                    <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae atque ex dolore incidunt maxime, architecto reprehenderit rerum doloribus et reiciendis, aspernatur quo tempora necessitatibus asperiores tenetur odit consequuntur est animi?</p>
                </div>
                <div className="my-4 ml-20 w-[600px] space-y-2">
                    <h3 className="text-2xl">Details</h3>
                    <div className="flex gap-2 text-xs ">
                        <span className="bg-neutral-800 py-2 px-4 rounded-full flex w-fit items-center gap-2">Preservatives <FaCheck /></span>
                        <span className="bg-neutral-800 py-2 px-4 rounded-full flex w-fit items-center gap-2">Artificial Colouring <FaCheck /></span>
                        <span className="bg-neutral-800 py-2 px-4 rounded-full flex w-fit items-center gap-2">Artificial Flavouring <FaCheck /></span>
                    </div>
                </div>
            </section>
        </>
    )
}