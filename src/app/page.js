"use client"
import { Input } from "@/components/ui/input";
import VacancyItem from "@/components/VacancyItem";
import VacancyItemSkeleton from "@/components/VacancyItemSkeleton";
import { formatDistance, formatDistanceToNow } from "date-fns";
import {az} from "date-fns/locale"
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getformattedDateAz = (currentDate) => {
    const date = new Date(currentDate);
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: az
    })
  }

  useEffect(() => {
    const getVacancies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/vacancy");
        const data = await res.json();

        if (res.ok) {
          setVacancies(data);
        } else {
          toast.error("Ошибка получение вакансии");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getVacancies();
  }, []);
  return (
    <div className="my-10">
      <div className="container">
        <div className="py-10 px-5 shadow-md my-6 rounded-md bg-white">
          <Input placeholder="Vakansiya adı və ya açar söz" />
        </div>
        <h3 className="text-2xl font-semibold mb-6">Vakansiyalar</h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading && [...Array(8)].map((el, index) => <VacancyItemSkeleton key={index} />)}
          {
            vacancies?.map(vacancy => (
              <VacancyItem key={vacancy._id} id={vacancy._id} views={vacancy.views} title={vacancy.title} companyTitle={vacancy.company.title} companyImageUrl={vacancy.company.imageUrl} createdAt={getformattedDateAz(vacancy.createdAt)} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
