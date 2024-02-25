"use client"

import HeaderProduct from "~/components/HeaderProduct";
import { UserBar } from "~/components/UserBar"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { toast } from "~/components/ui/use-toast"
import { Checkbox } from "~/components/ui/checkbox";

const formSchema = z.object({
  first: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  last: z.string().min(2, {
    message: "Last Name must be at least 2 characters."
  }),
  farmer: z.boolean().default(false)
})

export default function UserPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first: "",
      last: "",
      farmer: false
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // alert(values.first + " " + values.last + "Value :" + values.farmer)
    const data = await fetch("/api/user/details", {
        method:"POST",
        body:JSON.stringify({name:values.first+" "+values.last, farmer:values.farmer})
    })
  }
  return (
    <>
      <HeaderProduct />
      <UserBar />
      <section className="absolute w-1/4 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="first"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="farmer"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4 shadow ">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Are you a Farmer?</FormLabel>
                    <FormDescription>
                      To access the Sales Dashboard, you have to click this
                    </FormDescription></div>
                </FormItem>
              )} />
            <Button className="rounded-full hover:border-2 hover:bg-black hover:text-white" type="submit">Submit</Button>
          </form>
        </Form>
      </section>
    </>
  )
}

