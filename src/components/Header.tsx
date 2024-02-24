
"use client"
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuLink } from "~/components/ui/navigation-menu"
import {NavigationMenu} from "~/components/ui/navigation-menu"
import {Button} from "~/components/ui/button"
import {signOut, signIn, useSession} from "next-auth/react"
import { Input } from "./ui/input"
import { MdSearch } from "react-icons/md";import { IoMdCart } from "react-icons/io";
import Link from "next/link"
export default function Header(){
    return (
        <header className="flex items-start justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-slate-50 to-slate-400 antialiased">Harvest Direct</h1>
            <div className="w-96 space-y-4">
            <span className="relative">
            <MdSearch className="fill-white absolute size-5 top-[50%] left-3 -translate-y-1/2"/>
            <Input className="ps-9 rounded-full" type="text" placeholder="Search for any items" />
            </span>
            <NavBar/>
            </div>
            <UserNavBar/>
        </header>
    )
}


const ListItem = ({children, className}:{children?:React.ReactNode|string, className?:string})=>{
    return (
        <li className={className} >
            <NavigationMenuLink asChild>{children}</NavigationMenuLink>
        </li>
    )
}


const NavBar = ()=>{
    return (
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Items</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid h-20 w-96">
                                <ListItem><p>life</p></ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
    )
}
export const UserNavBar = ()=>{
    const {status} = useSession()
    return (
        <div className="flex gap-2">
            {status === "unauthenticated" && <Button className="" onClick={()=>signIn("google")}>Log in</Button>}
            {status ==="authenticated" && <Link href="/cart"><Button className="w-12">{<IoMdCart className="h-5 w-5" />}</Button></Link> }
            {status==="authenticated" && <Button onClick={()=>signOut()}>Log Out</Button>}
        </div>
    )
}