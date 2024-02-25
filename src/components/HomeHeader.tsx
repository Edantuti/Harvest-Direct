"use client"

import {useSession, signIn, signOut} from "next-auth/react"
import { Button } from "./ui/button";
import Link from "next/link";

export default function HomeHeader () {
    const {data:session, status} = useSession()
    console.log(status)
    return (
        <header className="flex items-center justify-between px-6 py-4">
            <Link href="/"><h1 className="text-2xl font-semibold  bg-clip-text text-transparent bg-gradient-to-b from-slate-50 to-slate-400">Harvest Direct</h1></Link>
            <div className="flex gap-2">
            <Link href="/items" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-4 py-2">Products</Link> 
            {status==="unauthenticated" && <Button className="" onClick={()=>signIn("google")} >Sign In</Button>}
            {status === "loading" && <Button className="" >Loading...</Button>}
            {status === "authenticated" && <Button className="" onClick={()=>signOut()}>Log out</Button>}</div>
        </header>    
    )
}