import ProductCard from "~/components/ProductCard";
import SideBar from "~/components/SideBar";
import Header from "~/components/Header";

export default async function WebPage(){
  return (
  <main className="">
    <Header/>
    <SideBar/>
    <section className="ml-auto border min-h-screen rounded p-4 grid grid-cols-4 gap-10 w-fit mr-20">
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </section>
  </main>
  )
}
