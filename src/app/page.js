import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// types: ["Tam ştat", "Yarım-ştat", "Frilans", "Təcrübəçi", "Uzaqdan", "Müvəqqəti iş"]
// education: ["Ali", "Natamam ali", "Orta"],
// experience: ["1 ildən az", "1 ildən 3 ilə qədər", "3 ildən 5 ilə qədər", "5 ildən yüksək"]

const data = [
  {
    id: 1,
    title: "Proqramlaşdırma üzrə baş mütəxəssis (Senior Full-Stack Developer)",
    category: "Elm, Texnologiya və Mühəndislik",
    company: "Guven Technology LLC",
    location: "Bakı",
    types: "Tam ştat",
    education: "Ali",
    experience: "1 ildən az"
  },
  {
    id: 2,
    title: "Fəhlə (Məişət anbarı)",
    category: "Logistika və nəqliyyat",
    company: "Kontakt Home",
    location: "Bakı",
    types: "Tam ştat",
    education: "Orta",
    experience: "1 ildən 3 ilə qədər"
  },
  {
    id: 3,
    title: "Sürücü",
    category: "Xidmət sahələri",
    company: "Prime Cotton",
    location: "Bakı",
    types: "Tam ştat",
    education: "Orta",
    experience: "1 ildən 3 ilə qədər"
  }
];


export default function Home() {
  return (
    <div className="bg-neutral-50 py-20">
      <div className="container">
        {/* <div className="text-center">
          <h1 className="text-5xl font-bold mb-8">Gələcəyinin başladığı yer</h1>
          <p className="text-neutral-500 font-medium mb-10">Son 30 gündə Glorri ilə 368 namizəd xəyalındakı işə qovuşdu. Sırada sən varsan!</p>
        </div> */}
        <div className="bg-white shadow-md px-10 py-6">
          <div className="flex gap-5 mb-5">
            <Input placeholder="Vakansiya adı və ya açar söz" />
            <Select>
              <SelectTrigger className="w-sm">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

          </div>
          <div className="flex gap-5">
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
