"use client"

import { useDeleteVacancyMutation, useGetCategoriesQuery, useGetVacanciesQuery } from "@/services/vacancy";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import DropdownMenuCheckbox from "./DropdownMenuCheckbox";
import BadgeList from "./BadgeList";
import VacancyItem from "./VacancyItem";
import VacancyItemSkeleton from "./VacancyItemSkeleton";
import PaginationWrapper from "./PaginationWrapper";
import { getFormattedDate } from "@/lib/formattedDate";
import { SearchX } from "lucide-react";
import { education, experience, type } from "@/constant/data";
import { toast } from "sonner";


const HomeClient = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [category, setCategory] = useState([]);
    const [typeF, setTypeF] = useState([]);
    const [educationF, setEducationF] = useState([]);
    const [experienceF, setExperienceF] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);


    const { data, error, isLoading, isFetching } = useGetVacanciesQuery({
        categories: category.join(","),
        types: typeF.join(","),
        education: educationF.join(","),
        experience: experienceF.join(","),
        search: debouncedSearch,
        page: page,
        limit: 20
    });
    const [deleteVacancy] = useDeleteVacancyMutation();
    const { data: categories } = useGetCategoriesQuery();


    const start = (page - 1) * 20 + 1;
    const end = start + (data?.vacancies?.length || 0) - 1;

    useEffect(() => {
        setCategory(searchParams.get("category")?.split(",") || []);
        setTypeF(searchParams.get("types")?.split(",") || []);
        setEducationF(searchParams.get("education")?.split(",") || []);
        setExperienceF(searchParams.get("experience")?.split(",") || []);
        setSearch(searchParams.get("search") || "");
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();

        if (category.length) params.set("category", category.join(","));
        if (typeF.length) params.set("types", typeF.join(","));
        if (educationF.length) params.set("education", educationF.join(","));
        if (experienceF.length) params.set("experience", experienceF.join(","));
        if (search) params.set("search", search);
        if (page) params.set("page", page);

        // console.log(params)

        router.push(`?${params.toString()}`);
    }, [category, typeF, educationF, experienceF, search, page]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500);

        return () => clearTimeout(timeout)
    }, [search])

    useEffect(() => {
        const pageParam = parseInt(searchParams.get("page") || 1);
        setPage(pageParam);
    }, [searchParams]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);


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
        <section className="my-10">
            <div className="container">
                <div className="py-10 px-5 shadow-md my-6 rounded-md border bg-white">
                    <div className="">
                        <h2 className="title mb-1">Vakansiyalar</h2>
                        <p className="text-muted-foreground  mb-3 text-sm">{`${start} - ${end} / ${data?.total ? data?.total : "1"} nəticə göstərili`}r</p>
                        <div className="hidden md:flex gap-3">
                            <Input placeholder="Vakansiya adı və ya açar söz" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <DropdownMenuCheckbox title="Kateqoriyanı seçin" data={categories ? categories : []} value={category} onChange={setCategory} size="w-80" />
                        </div>
                        <div className="hidden md:flex gap-3 my-3 overflow-x-auto">
                            <DropdownMenuCheckbox title="Vakansiya növü" data={type} value={typeF} onChange={setTypeF} />
                            <DropdownMenuCheckbox title="Təcrübə" data={education} value={educationF} onChange={setEducationF} />
                            <DropdownMenuCheckbox title="Təhsil" data={experience} value={experienceF} onChange={setExperienceF} />
                        </div>
                        <div className="block md:hidden">
                            <Input placeholder="Vakansiya adı və ya açar söz" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {/* <BadgeList data={category} setData={setCategory} options={categories} /> */}
                            <BadgeList data={typeF} setData={setTypeF} options={type} />
                            <BadgeList data={educationF} setData={setEducationF} options={education} />
                            <BadgeList data={experienceF} setData={setExperienceF} options={experience} />
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                    {(isLoading || isFetching) && [...Array(12)].map((el, index) => <VacancyItemSkeleton key={index} />)}
                    {
                        data?.vacancies?.map(vacancy => (
                            <VacancyItem key={vacancy._id} id={vacancy._id} views={vacancy.views} title={vacancy.title} companyTitle={vacancy.company.title} companyImageUrl={vacancy.company.imageUrl} createdAt={getFormattedDate(vacancy.createdAt)} slug={vacancy.slug} onClick={(e) => handleDelete(e, vacancy.slug)} salary={vacancy.salary} />
                        ))
                    }
                </div>
                {
                    data?.totalPages > 1 && (
                        <PaginationWrapper page={page} setPage={setPage} totalPages={data?.totalPages} />
                    )
                }
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
        </section>
    )
}

export default HomeClient