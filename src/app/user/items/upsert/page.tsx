import HeaderProduct from "~/components/HeaderProduct"
import UploadItem from "~/components/UploadItem"
import UpdateItem from "~/components/UpdateItem"
import { UserBar } from "~/components/UserBar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { authOptions } from "~/server/auth"
import { getServerSession } from "next-auth"
export default async function UserPage(){
    const session = await getServerSession(authOptions)
    
    return (
        <>
            <HeaderProduct/>
            <UserBar />
            <section className="mx-auto w-2/3">
                {session && <Tabs defaultValue="update" className="w-fit mx-auto">
                    <TabsList className="">
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                        <TabsTrigger value="update">Update</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload">
                        <UploadItem />
                    </TabsContent>
                    <TabsContent value="update">
                        <UpdateItem session={session} />
                    </TabsContent>
                </Tabs>}
            </section>
        </>
    )
}