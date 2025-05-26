"use client"

import { useDeleteVacancyMutation, useGetCategoriesQuery, useGetVacanciesQuery } from "@/services/vacancy";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import DropdownMenuCheckbox from "./DropdownMenuCheckbox";
import BadgeList from "./BadgeList";
import PaginationWrapper from "./PaginationWrapper";
import { getFormattedDate } from "@/lib/formattedDate";
import { SearchCheck, SearchX, SlidersHorizontal, Trash2 } from "lucide-react";
import { educations, experiences, types } from "@/constant/data";
import { toast } from "sonner";
import { Button } from "./ui/button";
import VacancyItem from "./cards/VacancyItem";
import VacancyItemSkeleton from "./cards/skeletons/VacancyItemSkeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import CheckboxMenuForm from "./CheckboxMenuForm";
import { Skeleton } from "./ui/skeleton";


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

    const [mobileCategory, setMobileCategory] = useState([]);
    const [mobileTypeF, setMobileTypeF] = useState([]);
    const [mobileEducationF, setMobileEducationF] = useState([]);
    const [mobileExperienceF, setMobileExperienceF] = useState([]);

    const [open, setOpen] = useState(null);


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
        const c = searchParams.get("category")?.split(",") || [];
        const t = searchParams.get("types")?.split(",") || [];
        const e = searchParams.get("education")?.split(",") || [];
        const ex = searchParams.get("experience")?.split(",") || [];

        setCategory(c);
        // setMobileCategory(c);

        setTypeF(t);
        // setMobileTypeF(t);

        setEducationF(e);
        // setMobileEducationF(e);

        setExperienceF(ex);
        // setMobileExperienceF(ex);

        setSearch(searchParams.get("search") || "");

        setPage(1);
    }, []);

    const applyFilter = () => {
        setCategory(mobileCategory);
        setTypeF(mobileTypeF);
        setEducationF(mobileEducationF);
        setExperienceF(mobileExperienceF);

        setPage(1);

        // setOpen(false)
    }

    useEffect(() => {
        const params = new URLSearchParams();
        setOpen(false);

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
        setPage(1);
    }, [category, typeF, educationF, experienceF, search])

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

    const handleDelete = async (e, slug) => {
        try {
            e.preventDefault();
            const result = await deleteVacancy(slug).unwrap();
            toast.success(result.msg);
        } catch (error) {
            toast.error(error?.data?.msg);
        }
    }

    const resetFilter = () => {
        setSearch("");
        setCategory([]);
        setTypeF([]);
        setEducationF([]);
        setExperienceF([]);

        setMobileCategory([]);
        setMobileTypeF([]);
        setMobileEducationF([]);
        setMobileExperienceF([]);

        router.push("/");
        setPage(1)
    }

    return (
        <section className="py-5 md:py-10">
            <div className="container">
                <div className="text-center">
                {
                    data ? (
                        <h6 className="text-sm md:text-lg text-muted-foreground italic">{data?.totalVacancies} aktiv vakansiya {data?.totalCompanies} şirkət tərəfindən</h6>
                    ) : (
                        <Skeleton className="max-w-xl h-7 mx-auto" />
                    )
                }
                </div>
                <div className="py-10 px-5 shadow-md my-6 rounded-md border bg-background">
                    <div className="">
                        <h2 className="title mb-1">Vakansiyalar</h2>
                        <p className="text-muted-foreground  mb-3 text-sm">{`${start} - ${end} / ${data?.total ? data?.total : "1"} nəticə göstərili`}r</p>
                        <div className="hidden md:flex gap-3">
                            <Input placeholder="Vakansiya adı və ya açar söz" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <DropdownMenuCheckbox title="Kateqoriyanı seçin" data={categories ? categories : []} value={category} onChange={setCategory} size="w-80" />
                        </div>
                        <div className="hidden md:flex gap-3 my-3 overflow-x-auto items-center">
                            <DropdownMenuCheckbox title="Vakansiya növü" data={types} value={typeF} onChange={setTypeF} />
                            <DropdownMenuCheckbox title="Təhsil" data={educations} value={educationF} onChange={setEducationF} />
                            <DropdownMenuCheckbox title="Təcrübə" data={experiences} value={experienceF} onChange={setExperienceF} />
                            <Button variant="destructive" className="ml-8" onClick={resetFilter}>
                                <Trash2 />
                                Sıfırla
                            </Button>
                        </div>
                        <div className="flex flex-col justify-center gap-5  md:hidden">
                            <Input placeholder="Vakansiya adı və ya açar söz" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <div className="flex justify-center">
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="w-min">
                                            <SlidersHorizontal />
                                            Filtr
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[440px] w-[90%]">
                                        <DialogHeader>
                                            <DialogTitle>Daha çox filter</DialogTitle>
                                            <DialogDescription className="hidden">reste</DialogDescription>

                                        </DialogHeader>
                                        <div className="h-[60vh] overflow-y-auto">
                                            <CheckboxMenuForm title="Kateqoriyanı seçin" data={categories} value={mobileCategory} onChange={setMobileCategory} />
                                            <CheckboxMenuForm title="Vakansiya növü" data={types} value={mobileTypeF} onChange={setMobileTypeF} />
                                            <CheckboxMenuForm title="Təhsil" data={educations} value={mobileEducationF} onChange={setMobileEducationF} />
                                            <CheckboxMenuForm title="Təcrübə" data={experiences} value={mobileExperienceF} onChange={setMobileExperienceF} />
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={applyFilter}>
                                                <SearchCheck />
                                                Axtar
                                            </Button>
                                            {/* <Button variant="outline" onClick={resetFilter}>
                                                <Trash2 />
                                                Sıfırla
                                            </Button> */}
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="destructive" className="ml-4" onClick={resetFilter}>
                                    <Trash2 />
                                    Sıfırla
                                </Button>

                            </div>
                        </div>
                        <div className="hidden md:flex flex-wrap  overflow-x-auto">
                            <BadgeList data={category} setData={setCategory} options={categories} />
                            <BadgeList data={typeF} setData={setTypeF} options={types} />
                            <BadgeList data={educationF} setData={setEducationF} options={educations} />
                            <BadgeList data={experienceF} setData={setExperienceF} options={experiences} />
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