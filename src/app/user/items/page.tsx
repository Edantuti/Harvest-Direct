"use client"
import HeaderProduct from "~/components/HeaderProduct"
import { UserBar } from "~/components/UserBar"
import { fetcher } from "~/app/items/page"
import { Table, TableCaption, TableHeader, TableRow, TableBody, TableCell, TableHead } from "~/components/ui/table"
import useSWR from "swr"
import Image from "next/image"
export default function UserPage(){
    const {data, error, isLoading} = useSWR("/api/user/item", fetcher)
    console.log(data)
    return (
        <>
            <HeaderProduct/>
            <UserBar />
            <section className="w-2/3 mx-auto my-32">
                <h4 className="text-4xl">Goods DashBoard</h4>
            {!isLoading &&<Table className="">
                    <TableCaption>List of all the items you sell</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Serial no.</TableHead>
                            <TableHead>Item Image</TableHead>
                            <TableHead>Item ID</TableHead>
                            <TableHead>Item name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((obj:any,index:number)=>(
                            <TableRow key={obj.id}>
                                <TableCell>{index+1}.</TableCell>
                                <TableCell><Image src={obj.photos[0]} alt="item photo" width="100" height="100" /></TableCell>
                                <TableCell>{obj.id}</TableCell>
                                <TableCell>{obj.name}</TableCell>
                                <TableCell>{obj.type}</TableCell>
                                <TableCell>{obj.quantity}</TableCell>
                                <TableCell>{obj.price}</TableCell>
                                <TableCell>{(new Date(obj.createdAt)).toDateString()}</TableCell>
                            </TableRow>))
                        }
                    </TableBody>
                </Table>}
            </section>
        </>
    )
}