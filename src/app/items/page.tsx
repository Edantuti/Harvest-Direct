"use client"
import ProductCard from "~/components/ProductCard";
import SideBar from "~/components/SideBar";
import Header from "~/components/Header";
import useSWR, { SWRConfig } from 'swr'

export const fetcher = (url:string)=>{
  return fetch(url).then(res=>{console.log(res);return res.json()})
}


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
    {isLoading && <p>wait</p>}    
    <section className="mx-auto border rounded p-4 grid grid-flow-col-dense gap-10 w-fit">
    
    {!isLoading && data.map((obj:any)=>(
      <ProductCard key={obj.id} {...obj}/>
    ))}
    </section>
  </main>
  )
}
