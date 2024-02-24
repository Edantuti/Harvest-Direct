"use client"

import {signIn, useSession} from "next-auth/react";
import Link from "next/link";
import Header from "~/components/Header";

export default function WebPage(){
  const {data:session, status} = useSession()
  if(status==="loading"){
    return (
      <main className="">
        <p>loading</p>
      </main>
    )
  }
  return (
  <main className="">
    <Header/>
  </main>
  )
}
