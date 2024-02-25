"use client"

import HeaderProduct from "~/components/HeaderProduct";
import { UserBar } from "~/components/UserBar";
import { fetcher } from "~/lib/utils"
import { Table, TableCaption, TableHeader, TableRow, TableBody, TableCell, TableHead } from "~/components/ui/table"
import useSWR from "swr"
import { useSession } from "next-auth/react";
import {Card, CardContent} from "~/components/ui/card"
export default function UserPage(){
  const {data, error, isLoading} = useSWR('/api/user/orders',fetcher)
  const {data:session, status} = useSession()
    return (
        <>
            <HeaderProduct/>
            <section className="min-h-screen">
               <UserBar /> 
            <div className="mx-auto w-[50vw] space-y-4 p-6">
              <Card>
                <CardContent className="p-10 h-full">
                  {status==="authenticated" && <span className="text-4xl font-semibold">Welcome Back, {session.user.name}</span>}
                </CardContent>
              </Card>
            <Card className="col-span-3 row-span-1 w-full">
                <CardContent className="p-10 h-full">
                  <span className="text-4xl font-semibold">{"Orders"}</span>
                  {!isLoading &&<Table className="">
                    <TableCaption>List of all the orders made by you.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Serial no.</TableHead>
                            <TableHead>Order ID</TableHead>
                            <TableHead>name of the items</TableHead>
                            <TableHead>Total Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((obj:any,index:number)=>(
                            <TableRow key={obj.id}>
                                <TableCell>{index+1}.</TableCell>
                                <TableCell>{obj.id}</TableCell>
                                <TableCell>{obj.ItemOrder.reduce((sum:string,curr:any)=>sum+curr.item.name+", ","")}</TableCell>
                                <TableCell>{obj.ItemOrder.length}</TableCell>
                                <TableCell>{obj.total}</TableCell>
                                <TableCell>{(new Date(obj.createdAt)).toDateString()}</TableCell>
                            </TableRow>))
                        }
                    </TableBody>
                </Table>}
                </CardContent>
              </Card>
            </div>
            </section>
        </>
    )
}



