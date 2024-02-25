"use client"
import { fetcher } from "~/app/items/page"
import HeaderProduct from "~/components/HeaderProduct"
import { UserBar } from "~/components/UserBar"
import { Table, TableCaption, TableHeader, TableRow, TableBody, TableCell, TableHead } from "~/components/ui/table"
import useSWR from "swr"
export default function UserPage(){
    const {data, error, isLoading} = useSWR('/api/user/orders',fetcher)
    console.log(data)

    return (
        <>
            <HeaderProduct/>
            <UserBar />
            <section className=" w-2/3 mx-auto">
                <h3 className="text-4xl">Order DashBoard</h3>
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
            </section>
        </>
    )
}