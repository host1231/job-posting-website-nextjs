"use client"
import DropdownMenuCheckbox from "@/components/DropdownMenuCheckbox";
import { Input } from "@/components/ui/input";
import VacancyItem from "@/components/VacancyItem";
import VacancyItemSkeleton from "@/components/VacancyItemSkeleton";
import { getFormattedDate } from "@/lib/formattedDate";
import { useDeleteVacancyMutation, useGetVacanciesQuery } from "@/services/vacancy";
import { toast } from "sonner";
// import { toast } from "sonner";


const type = [
  {
    _id: 1, value: "Full-time", title: "Tam ştat"
  },
  {
    _id: 2, value: "Part-time", title: "Yarım-ştat"
  },
  {
    _id: 3, value: "Freelance", title: "Frilans"
  },
  {
    _id: 4, value: "Intern", title: "Təcrübəçi"
  },
  {
    _id: 5, value: "Remote", title: "Uzaqdan"
  },
  {
    _id: 6, value: "Temporary", title: "Müvəqqəti iş"
  },
];

const education = [
  {
    _id: 1, value: "High", title: "Ali"
  },
  {
    _id: 2, value: "Partial high", title: "Natamam ali"
  },
  {
    _id: 3, value: "Medium", title: "Orta"
  },
];

const experience = [
  {
    _id: 1, value: "No experience", title: "Təcrubəsiz"
  },
  {
    _id: 2, value: "1-3 years", title: "1 ildən 3 ilə qədər"
  },
  {
    _id: 3, value: "3-5 years", title: "3 ildən 5 ilə qədər"
  },
  {
    _id: 4, value: "5+ years", title: "5 ildən yüksək"
  },
];


export default function Home() {
  const { data: vacancies, error, isLoading, isFetching } = useGetVacanciesQuery();
  const [deleteVacancy] = useDeleteVacancyMutation();


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
            <Input placeholder="Vakansiya adı və ya açar söz" />
            <div className="flex gap-3 my-3">
              {/* <DropdownMenuCheckbox title="Тип" data={type} value={typeF} onChange={setTypeF} /> */}
            </div>
          </div>
        </div>
        <h2 className="title mb-3">Vakansiyalar</h2>
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
