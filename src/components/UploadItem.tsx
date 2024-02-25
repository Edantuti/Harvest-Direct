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
    quantity:z.string().min(1,{message:"Atleast item quantity has to be one"}),
    type:z.string(),
    price:z.number().min(1,{message:"Price must be greater than one."}),
    description:z.string(),
    details:z.array(z.string())
})


export default function UploadItem(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            quantity:"0",
            type:'organic',
            price:0,
            description:"",
            details:[]
        }
    })
    const [file,changeFile] = useState<File|null>(null)
    function changeFi(e:any){
        if(!e.target.files[0]) return;
        changeFile(e.target.files[0])
    }
    function onSubmit(values:z.infer<typeof formSchema>){
        console.log(file)
        if(file===null) return;
        console.log(values)
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                    <p>File input</p>
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
                    
                    <FormField control={form.control} name="description" render={
                        ({field}) =>(
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Description" {...field} />
                                </FormControl>
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