"use client"

import VacancyItemSkeleton from "@/components/cards/skeletons/VacancyItemSkeleton";
import VacancyItem from "@/components/cards/VacancyItem";
import CompanyHeader from "@/components/CompanyHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { getFormattedDate } from "@/lib/formattedDate";
import { useGetCompaniesBySlugQuery } from "@/services/vacancy"
import { SearchX } from "lucide-react";
import { usePathname } from "next/navigation"

const CompanyVacancies = () => {
    const pathname = usePathname();
    const slug = pathname.replace("companies", "").replace("vacancies", "").replaceAll("/", "");

    const { data, error, isLoading, isFetching } = useGetCompaniesBySlugQuery(slug);

    console.log(data)

    return (
        <section className="py-5 md:py-10">
            <div className="container">
                <CompanyHeader data={data?.company} withoutBtn />
                <div className="my-6">
                    {
                        !isLoading ? (
                            <h4 className="text-xl lg:text-2xl font-semibold mb-6">{data?.company?.title} - Vakansiayalar</h4>
                        ) : (
                            <Skeleton className="h-8 mb-3" />
                        )
                    }
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                        {(isLoading || isFetching) && [...Array(12)].map((el, index) => <VacancyItemSkeleton key={index} />)}
                        {
                            data?.vacancies?.map(vacancy => (
                                <VacancyItem key={vacancy._id} id={vacancy._id} views={vacancy.views} title={vacancy.title} companyTitle={data.company.title} companyImageUrl={data.company.imageUrl} createdAt={getFormattedDate(vacancy.createdAt)} slug={vacancy.slug} onClick={(e) => handleDelete(e, vacancy.slug)} salary={vacancy.salary} />
                            ))
                        }
                    </div>
                    {
                        data?.vacancies.length === 0 && (
                            <div className="flex justify-center items-center flex-col text-primary">
                                <SearchX size={200} className="hidden md:block" />
                                <SearchX size={100} className="md:hidden" />
                                <p className="font-semibold text md:text-xl text-center">Təəssüf ki hal-hazırda axtardığınız sorğuya uyğun nəticə mövcud deyil.</p>
                                <p className="font-semibold text-3xl text-center">:(</p>
                            </div>
                        )
                    }

                </div>
            </div>
        </section>
    )
}

export default CompanyVacancies