"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { educations, experiences, types } from '@/constant/data';
import { getFormattedDate } from '@/lib/formattedDate';
import { fromSlug } from '@/lib/slug';
import { useAddVacancyViewMutation, useDeleteVacancyMutation, useGetVacanciesBySlugQuery } from '@/services/vacancy';
import { Building, Clock, EllipsisVertical, Eye, HandCoins, LayoutList, Send, SeparatorVertical, TimerReset } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const VacancyAbout = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const slug = pathname.replace("/", "");

    const { data: vacancy, error, isLoading: loading } = useGetVacanciesBySlugQuery(slug);
    const [addVacancyView, { data, error: viewError, isLoading: viewLoading }] = useAddVacancyViewMutation();


    useEffect(() => {
        (async () => {
            if (slug) {
                await addVacancyView(slug).catch(console.error);
            }
        })();

    }, [slug, addVacancyView]);



    const getEmail = () => {
        setOpen(true);
        window.navigator.clipboard.writeText(vacancy.email)
        toast.success(`Почта скопирован!`);
    }

    return (
        <section className="py-5 md:py-10">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full h-min">
                        <div className="border rounded-md shadow-md p-6 bg-background">
                            {
                                loading
                                    ? (
                                        <div className="flex items-center gap-6 w-full">
                                            <Skeleton className="w-20 h-20 md:w-[140px] md:h-[140px] rounded-full" />
                                            <div className="flex-1">
                                                <Skeleton className="h-9 mb-1" />
                                                <Skeleton className="h-[19px]" />
                                                <div className="flex gap-2 mt-2">
                                                    <Skeleton className="w-[20%] h-6" />
                                                    <Skeleton className="w-[20%] h-6" />
                                                    <Skeleton className="w-[20%] h-6" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 md:gap-6">
                                            <Avatar className="w-20 h-20 lg:w-35 lg:h-35">
                                                <AvatarImage src={vacancy?.company?.imageUrl} />
                                            </Avatar>
                                            <div>
                                                <h2 className="title mb-1">{vacancy?.title}</h2>
                                                <div className="flex flex-col lg:flex-row text-muted-foreground lg:items-center lg:gap-2">
                                                    <span className="flex gap-1 items-center text-xs md:text-base">
                                                        {/* <Building width={16} /> */}
                                                        {vacancy?.company?.title}
                                                    </span>
                                                    <span className="hidden lg:block w-2 h-2 bg-muted-foreground rounded-full"></span>
                                                    <span className="flex gap-1 items-center text-xs md:text-base">
                                                        {/* <LayoutList width={16} /> */}
                                                        {vacancy?.categories[0]?.title}
                                                    </span>
                                                </div>
                                                <div className="flex text-xs gap-2 md:text-base md:gap-4 text-muted-foreground mt-2 font-medium">
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={18} />
                                                        {getFormattedDate(vacancy?.createdAt)}
                                                    </span>
                                                    {
                                                        vacancy?.salary && (
                                                            <span className="flex items-center gap-1">
                                                                <HandCoins size={18} />
                                                                {vacancy?.salary} ₼
                                                            </span>
                                                        )
                                                    }
                                                    <span className="flex items-center gap-1">
                                                        <Eye size={18} />
                                                        {vacancy?.views}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            }

                        </div>
                        {
                            loading
                                ? (
                                    <div className="hidden lg:block">
                                        <div className="my-6">
                                            <Skeleton className="w-50 h-8 mb-3" />
                                            <Skeleton className="w-full h-30" />
                                        </div>
                                        <div className="my-6">
                                            <Skeleton className="w-50 h-8 mb-3" />
                                            <Skeleton className="w-full h-30" />
                                        </div>
                                    </div>
                                )
                                : (
                                    <div className="hidden lg:block">
                                        <div className="my-6">
                                            <h3 className="text-2xl font-semibold mb-3">Təsvir</h3>
                                            <div className="text-muted-foreground description" dangerouslySetInnerHTML={{ __html: vacancy?.description || '' }} />

                                        </div>
                                        <div className="my-6">
                                            <h3 className="text-2xl font-semibold mb-3">Tələblər</h3>
                                            <div className="text-muted-foreground requirement" dangerouslySetInnerHTML={{ __html: vacancy?.requirements || '' }} />
                                        </div>
                                    </div>
                                )
                        }


                    </div>
                    <div className="border rounded-md shadow-md p-6 lg:w-sm h-min lg:sticky top-30 right-0 bg-background">
                        {
                            loading
                                ? <Skeleton className="w-full h-7" />
                                : <h4 className="text-lg lg:text-xl font-semibold text-center">Vakansiya haqqında</h4>
                        }
                        <div className="border-b my-3"></div>
                        <div>
                            {
                                loading
                                    ? (
                                        <div className="flex flex-col gap-3 my-5">
                                            <div>
                                                <Skeleton className="w-[80px] h-5 mb-1" />
                                                <Skeleton className="w-[120px] h-5 mb-1" />
                                            </div>
                                            <div>
                                                <Skeleton className="w-[80px] h-5 mb-1" />
                                                <Skeleton className="w-[120px] h-5 mb-1" />
                                            </div>
                                            <div>
                                                <Skeleton className="w-[80px] h-5 mb-1" />
                                                <Skeleton className="w-[120px] h-5 mb-1" />
                                            </div>
                                            <div>
                                                <Skeleton className="w-[80px] h-5 mb-1" />
                                                <Skeleton className="w-[120px] h-5 mb-1" />
                                            </div>
                                            <div>
                                                <Skeleton className="w-[80px] h-5 mb-1" />
                                                <Skeleton className="w-[120px] h-5 mb-1" />
                                            </div>
                                            <div>
                                                <Skeleton className="w-[80px] h-5 mb-1" />
                                                <Skeleton className="w-[120px] h-5 mb-1" />
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <div className="flex flex-col gap-3 my-5">
                                            <p className="font-medium">
                                                <span className="block text-sm text-muted-foreground font-light mb-1">Son tarix</span>
                                                {getFormattedDate(vacancy?.expiresAt, true)}
                                            </p>
                                            <p className="font-medium">
                                                <span className="block text-sm text-muted-foreground font-light mb-1">Paylaşılıb</span>
                                                {getFormattedDate(vacancy?.createdAt, true)}
                                            </p>

                                            <p className="font-medium">
                                                <span className="block text-sm text-muted-foreground font-light mb-1">Maaş</span>
                                                {vacancy?.salary ? `${vacancy?.salary} ₼` : "Razılaşma yolu ilə"} 
                                            </p>

                                            <p className="font-medium">
                                                <span className="block text-sm text-muted-foreground font-light mb-1">Vakansiya növü</span>
                                                {
                                                    types.map(item => vacancy?.type == item.value && item.title)
                                                }
                                            </p>
                                            <p className="font-medium">
                                                <span className="block text-sm text-muted-foreground font-light mb-1">Təhsil</span>
                                                {
                                                    educations.map(item => vacancy?.education === item.value && item.title)
                                                }
                                            </p>
                                            <p className="font-medium">
                                                <span className="block text-sm text-muted-foreground font-light mb-1">Təcrübə</span>
                                                {
                                                    experiences.map(item => vacancy?.experience === item.value && item.title)
                                                }
                                            </p>
                                        </div>
                                    )
                            }
                            {
                                loading
                                    ? <Skeleton className="w-full h-9" />
                                    : (
                                        <Button className="w-full" onClick={() => getEmail(vacancy?.email)}>
                                            <Send />
                                            {open ? vacancy?.email : "Muraciət et"}
                                        </Button>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <div>
                    {
                        loading
                            ? (
                                <div className="lg:hidden">
                                    <div className="my-6">
                                        <Skeleton className="w-50 h-8 mb-3" />
                                        <Skeleton className="w-full h-30" />
                                    </div>
                                    <div className="my-6">
                                        <Skeleton className="w-50 h-8 mb-3" />
                                        <Skeleton className="w-full h-30" />
                                    </div>
                                </div>
                            )
                            : (
                                <div className="lg:hidden">
                                    <div className="my-6">
                                        <h3 className="text-xl font-semibold mb-3">Təsvir</h3>
                                        <div className="text-muted-foreground text-sm md:text-base" dangerouslySetInnerHTML={{ __html: vacancy?.description || '' }} />
                                    </div>
                                    <div className="my-6">
                                        <h3 className="text-xl font-semibold mb-3">Tələblər</h3>
                                        <div className="text-muted-foreground text-sm md:text-base" dangerouslySetInnerHTML={{ __html: vacancy?.requirements || '' }} />
                                    </div>
                                    <div className="my-6 text-right">
                                        {
                                            loading
                                                ? <Skeleton className="w-[124px] h-9 ml-auto" />
                                                : (
                                                    <Button className="" onClick={() => getEmail(vacancy?.email)}>
                                                        <Send />
                                                        {open ? vacancy?.email : "Muraciət et"}
                                                    </Button>
                                                )
                                        }
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div >
        </section >
    )
}

export default VacancyAbout