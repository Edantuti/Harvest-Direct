"use client"
import {useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
Form,
FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "~/components/ui/form"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "~/components/ui/select"


import { Input } from "~/components/ui/input"
import { toast } from "~/components/ui/use-toast"
import { Button } from "./ui/button"

const formSchema = z.object({
    name:z.string().min(2,{message:"The Item name should have atleast 2 characters."}),
    quantity:z.coerce.number().min(1,{message:"Atleast item quantity has to be one"}),
    type:z.string(),
    price:z.coerce.number().min(1,{message:"Price must be greater than one."}),
    rating:z.coerce.number().min(0).max(10)
})


export default function UploadItem(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            quantity:0,
            type:'organic',
            price:0,
            rating:0,
        }
    })
    const [file,changeFile] = useState<File|null>(null)
    function changeFi(e:any){
        if(!e.target.files[0]) return;
        changeFile(e.target.files[0])
    }
    async function onSubmit(values:z.infer<typeof formSchema>){
        if(file===null) return;
        const formData = new FormData();
        formData.append("name", values.name)
        formData.append("quantity", values.quantity.toString())
        formData.append("price",values.price.toString())
        formData.append("type", values.type)
        formData.append("rating", values.rating.toString())
        formData.append("file", file)
        try{
        const data = await fetch('/api/user/item', {
            method:"POST",
            body:formData
        })
        console.log(data)
        }catch(error){
            console.error(error)
        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                    <p>Photo upload</p>
                    <Input type="file" onChange={(e)=>changeFi(e)} />
                    <FormField control={form.control} name="name" render={
                        ({field}) =>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Item name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    } />

                    <FormField control={form.control} name="quantity" render={
                        ({field}) =>(
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Item quantity" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    } />
                    <FormField control={form.control} name="price" render={
                        ({field}) =>(
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Item Price" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    } />
                    <FormField control={form.control} name="rating" render={
                        ({field}) =>(
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Item rating"  {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    } />
                    <FormField control={form.control} name="type" render={
                        ({field}) =>(
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="organic">Organic</SelectItem>
                                    <SelectItem value="inorganic">InOrganic</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )
                    } />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}