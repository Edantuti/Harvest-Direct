import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
import { Slider } from "./ui/slider"
export default function SideBar (){
    return (
        <nav className="fixed top-1/2 -translate-y-1/2 left-5 bg-neutral-900 w-80 rounded">
            <ul className="my-10 space-y-5">
                <li className="flex gap-px items-center mx-5">
                    <span>Type:</span>
                <Select>
                    <SelectTrigger className="w-[10rem] mx-auto bg-neutral-800">
                        <SelectValue placeholder="Type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="organic">Organic</SelectItem>

                        <SelectItem value="inorganic">InOrganic</SelectItem>
                    </SelectContent>
                </Select>
                </li>
                <li className="flex gap-px items-center mx-5">
                    <span>From:</span>
                    <Select>
                        <SelectTrigger className="w-[10rem] mx-auto bg-neutral-800">
                            <SelectValue placeholder="Farmer"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Farmer1">Farmer 1</SelectItem>
                            <SelectItem value="Farmer2">Farmer 2</SelectItem>
                        </SelectContent>
                    </Select>
                </li>
                <li className="flex gap-px items-center mx-5">
                   <span>Freshness:</span>
                    <Slider defaultValue={[50]} max={2} step={1} className="w-[10rem] mx-auto" />
                </li>
                    
            </ul>
        </nav>
    )
}