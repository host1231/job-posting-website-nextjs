"use client"
import DropdownMenuCheckbox from "@/components/DropdownMenuCheckbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import VacancyItem from "@/components/VacancyItem";
import VacancyItemSkeleton from "@/components/VacancyItemSkeleton";
import { getFormattedDate } from "@/lib/formattedDate";
import { useDeleteVacancyMutation, useGetVacanciesQuery } from "@/services/vacancy";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// import { toast } from "sonner";


const type = [
  {
    value: "Full-time", title: "Tam ştat"
  },
  {
    value: "Part-time", title: "Yarım-ştat"
  },
  {
    value: "Freelance", title: "Frilans"
  },
  {
    value: "Intern", title: "Təcrubə"
  },
  {
    value: "Remote", title: "Uzaqdan"
  },
  {
    value: "Temporary", title: "Müvəqqəti iş"
  },
];

const education = [
  {
    value: "High", title: "Ali"
  },
  {
    value: "Partial high", title: "Natamam ali"
  },
  {
    value: "Medium", title: "Orta"
  },
];

const experience = [
  {
    value: "No experience", title: "Təcrubəsiz"
  },
  {
    value: "1-3 years", title: "1 ildən 3 ilə qədər"
  },
  {
    value: "3-5 years", title: "3 ildən 5 ilə qədər"
  },
  {
    value: "5+ years", title: "5 ildən yüksək"
  },
];


export default function Home() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [typeF, setTypeF] = useState([]);
  const [educationF, setEducationF] = useState([]);
  const [experienceF, setExperienceF] = useState([]);
  const [search, setSearch] = useState("");

  const { data: vacancies, error, isLoading, isFetching } = useGetVacanciesQuery({
    types: typeF.join(","),
    education: educationF.join(","),
    experience: experienceF.join(","),
    search: search
  });
  const [deleteVacancy] = useDeleteVacancyMutation();

  useEffect(() => {
    setTypeF(searchParams.get("types")?.split(",") || []);
    setEducationF(searchParams.get("education")?.split(",") || []);
    setExperienceF(searchParams.get("experience")?.split(",") || []);
    setSearch(searchParams.get("search") || "");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (typeF.length) params.set("types", typeF.join(","));
    if (educationF.length) params.set("education", educationF.join(","));
    if (experienceF.length) params.set("experience", experienceF.join(","));
    if (search) params.set("search", search);

    // console.log(params)

    router.push(`?${params.toString()}`);
  }, [typeF, educationF, experienceF, search]);


  const handleDelete = async (e, slug) => {
    try {
      e.preventDefault();
      const result = await deleteVacancy(slug).unwrap();
      toast.success(result.msg);
    } catch (error) {
      toast.error(error?.data?.msg);
    }
  }


  return (
    <div className="my-10">
      <div className="container">
        <div className="py-10 px-5 shadow-md my-6 rounded-md bg-white">
          <div className="">
            <h2 className="title mb-1">Vakansiyalar</h2>
            <p className="text-muted-foreground  mb-3 text-sm">18 / 837 nəticə göstərilir</p>
            <Input placeholder="Vakansiya adı və ya açar söz" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="flex gap-3 my-3">
              <DropdownMenuCheckbox title="Тип" data={type} value={typeF} onChange={setTypeF} />
              <DropdownMenuCheckbox title="Образование" data={education} value={educationF} onChange={setEducationF} />
              <DropdownMenuCheckbox title="Опыт работы" data={experience} value={experienceF} onChange={setExperienceF} />
            </div>
            <div>
              <div className="flex gap-2">
                {
                  typeF.map(type => (
                    <Badge key={type}>
                      {type}
                      <X className="cursor-pointer" size={80} onClick={() => setTypeF((prev) => prev.filter(prevType => prevType !== type))} />
                    </Badge>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(isLoading || isFetching) && [...Array(12)].map((el, index) => <VacancyItemSkeleton key={index} />)}
          {
            vacancies?.map(vacancy => (
              <VacancyItem key={vacancy._id} id={vacancy._id} views={vacancy.views} title={vacancy.title} companyTitle={vacancy.company.title} companyImageUrl={vacancy.company.imageUrl} createdAt={getFormattedDate(vacancy.createdAt)} slug={vacancy.slug} onClick={(e) => handleDelete(e, vacancy.slug)} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
