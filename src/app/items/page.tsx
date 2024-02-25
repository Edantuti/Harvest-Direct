"use client"
import ProductCard from "~/components/ProductCard";
import SideBar from "~/components/SideBar";
import Header from "~/components/Header";
import useSWR, { SWRConfig } from 'swr'
import { fetcher } from "~/lib/utils"


function getItems(){
  const result = useSWR('api/item', fetcher)
  return result
}
export default function WebPage(){
  const {data, error, isLoading} = getItems()
  

  console.log(data)
  return (
  <main className="">
    <Header/>
    <SideBar/>
    
    {!isLoading && <section className="mx-auto border rounded p-4 grid grid-cols-3 gap-10 w-fit">
    
    {data.map((obj:any)=>(
      <ProductCard key={obj.id} {...obj}/>
    ))}
    </section>}
  </main>
  )
}
