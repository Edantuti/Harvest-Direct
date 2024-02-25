
"use client"
import { UserNavBar } from "./Header"

import Link from "next/link";
export default function HeaderProduct(){
    return (
        <header className="flex items-center justify-between px-6 py-4">
            <Link href="/"><h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-slate-50 to-slate-400 antialiased">Harvest Direct</h1></Link>
            <UserNavBar/>
        </header>
    )
}