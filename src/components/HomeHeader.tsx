"use client"

import {useSession, signIn, signOut} from "next-auth/react"
import { Button } from "./ui/button";

export default function HomeHeader () {
    const {data:session, status} = useSession()
    console.log(status)
    return (
        <header className="flex items-center justify-between">
            <h1>Harvest Direct</h1>
            {status==="unauthenticated" && <Button className="" onClick={()=>signIn("google")} >Sign In</Button>}
            {status === "loading" && <Button className="" >Loading...</Button>}
            {status === "authenticated" && <Button className="" onClick={()=>signOut()}>Log out</Button>}
        </header>    
    )
}