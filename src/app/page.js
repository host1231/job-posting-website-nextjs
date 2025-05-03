import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import VacancyItem from "@/components/VacancyItem";
import VacancyItemSkeleton from "@/components/VacancyItemSkeleton";
import { Clock, Eye } from "lucide-react";

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
    <div className="my-10">
      <div className="container">
        <div className="py-10 px-5 shadow-md my-5">
          <Input />
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
          <VacancyItemSkeleton />
          {
            [...Array(10)].map((el, index) => (
              <VacancyItem key={index} />
            ))
          }
          

        </div>
      </div>
    </div>
  )
}
