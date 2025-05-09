"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getFormattedDate } from '@/lib/formattedDate';
import { fromSlug } from '@/lib/slug';
import { useAddVacancyViewMutation, useDeleteVacancyMutation, useGetVacanciesBySlugQuery } from '@/services/vacancy';
import { Building, Clock, EllipsisVertical, Eye, LayoutList, Send, SeparatorVertical, TimerReset } from 'lucide-react';
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
            if(slug) {
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
        <section className="py-10">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full h-min">
                        <div className="border rounded-md shadow-md p-6 bg-white">
                            {
                                loading
                                    ? (
                                        <div className="flex items-center gap-6">
                                            <Skeleton className="w-[140px] h-[140px] rounded-full" />
                                            <div className="flex-1">
                                                <Skeleton className="w-full h-9 mb-1" />
                                                <Skeleton className="w-[400px] h-[19px]" />
                                                <div className="flex gap-2 mt-2">
                                                    <Skeleton className="w-[70px] h-6" />
                                                    <Skeleton className="w-[70px] h-6" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-6">
                                            <Avatar className="w-20 h-20 lg:w-35 lg:h-35">
                                                <AvatarImage src={vacancy?.company?.imageUrl} />
                                            </Avatar>
                                            <div>
                                                <h2 className="title mb-1">{vacancy?.title}</h2>
                                                <div className="flex flex-col lg:flex-row text-muted-foreground lg:items-center lg:gap-2">
                                                    <span className="flex gap-1 items-center">
                                                        {/* <Building width={16} /> */}
                                                        {vacancy?.company?.title}
                                                    </span>
                                                    <span className="hidden lg:block w-2 h-2 bg-neutral-400 rounded-full"></span>
                                                    <span className="flex gap-1 items-center">
                                                        {/* <LayoutList width={16} /> */}
                                                        {vacancy?.categories[0]?.title}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2 text-muted-foreground mt-2 font-medium">
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={18} />
                                                        {getFormattedDate(vacancy?.createdAt)}
                                                    </span>
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
                                            <p className="text-muted-foreground">{vacancy?.description}</p>
                                        </div>
                                        <div className="my-6">
                                            <h3 className="text-2xl font-semibold mb-3">Tələblər</h3>
                                            <p className="text-muted-foreground">{vacancy?.requirements}</p>
                                        </div>
                                    </div>
                                )
                        }


                    </div>
                    <div className="border rounded-md shadow-md p-6 lg:w-sm h-min lg:sticky top-30 right-0 bg-white">
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
                                        </div>
                                    )
                                    : (
                                        <div className="flex flex-col gap-3 my-5">
                                            <p className="font-medium">
                                                <span className="block text-sm text-muted-foreground font-light mb-1">Son tarix</span>
                                                {getFormattedDate(vacancy?.createdAt, true)}
                                            </p>
                                            <p className="font-medium">
                                                <span className="block text-sm text-muted-foreground font-light mb-1">Paylaşılıb</span>
                                                {getFormattedDate(vacancy?.createdAt, true)}
                                            </p>
                                            <p className="font-medium">
                                                <span className="block text-sm text-muted-foreground font-light mb-1">Vakansiya növü</span>
                                                {vacancy?.type}
                                            </p>
                                            <p className="font-medium">
                                                <span className="block text-sm text-muted-foreground font-light mb-1">Təcrübə</span>
                                                {vacancy?.experience}
                                            </p>
                                            <p className="font-medium">
                                                <span className="block text-sm text-muted-foreground font-light mb-1">Təhsil</span>
                                                {vacancy?.education}
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
                                        <p className="text-muted-foreground text-sm md:text-base">{vacancy?.description}</p>
                                    </div>
                                    <div className="my-6">
                                        <h3 className="text-xl font-semibold mb-3">Tələblər</h3>
                                        <p className="text-muted-foreground text-sm md:text-base">{vacancy?.requirements}</p>
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