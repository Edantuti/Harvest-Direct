import Link from "next/link"
import {FaArrowRight} from "react-icons/fa"

export const UserBar = ()=>{
    return (
        <nav className="fixed -translate-y-1/2 top-1/2 h-96 border border-l-0 rounded p-10 bg-neutral-900">
            <h4 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-slate-50 to-slate-400 antialiased">User Menu</h4>
            <ul className="mx-auto w-56 my-5">
                <NavBarItem href="/user/">Dashboard</NavBarItem>
                <NavBarItem href="/user/orders">Orders</NavBarItem>
                <NavBarItem href="/user/details">User Details</NavBarItem>
                <NavBarItem href="/user/items">Goods</NavBarItem>
                <NavBarItem href="/user/items/upsert">Upload/Update Goods</NavBarItem>
                
            </ul>
        </nav>
    )
}

export const NavBarItem = ({children, href}:{children:string, href:string}) =>{
    return (
       <Link href={href} className="my-2"><li className="flex gap-2 items-center group my-4 hover:text-blue-400"><FaArrowRight className="group-hover:rotate-12 transition-all" /> {children}</li></Link> 
    )
}