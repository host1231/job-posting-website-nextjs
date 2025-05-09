"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCompaniesBySlugQuery } from '@/services/vacancy'
import { ArrowRight, CalendarDays, Globe, MapPinned, User, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CompanyAbout = () => {
    const pathname = usePathname();
    const slug = (pathname.replace("/companies/", ""));

    const {data: company, error, isLoading} = useGetCompaniesBySlugQuery(slug);

    return (
        <section className="my-10">
            <div className="container">
                <div className="border p-6 shadow-md bg-white rounded-md">
                    <div className="flex flex-col lg:flex-row items-center gap-6 relative w-full">
                        {
                            !isLoading ? (
                                <Avatar className="w-30 h-30 rounded-full lg:w-40 lg:h-40">
                                    <AvatarImage src={company?.imageUrl} alt="Logo" />
                                </Avatar>
                            ) : (
                                <Skeleton className="w-30 h-30 rounded-full lg:w-50 lg:h-50" />
                            )
                        }
                        <div className="">
                            {
                                !isLoading ? (
                                    <h2 className="title mb-6 text-center lg:text-left">{company?.title}</h2>
                                ) : (
                                    <Skeleton className="w-[500px] h-10 mb-6" />
                                )
                            }
                            {
                                !isLoading ? (
                                    <div className="flex flex-row gap-10 flex-wrap justify-center md:justify-start md:gap-15">
                                        <div className="flex items-center gap-4">
                                            <MapPinned className="text-primary" />
                                            <div className="lg:text-center">
                                                <span className="text-muted-foreground">Şəhər</span>
                                                <h6 className="font-bold">{company?.city}</h6>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <CalendarDays className="text-primary" />
                                            <div className="lg:text-center">
                                                <span className="text-muted-foreground">Təsis tarixi</span>
                                                <h6 className="font-bold">{company?.year}</h6>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Users className="text-primary" />
                                            <div className="lg:text-center">
                                                <span className="text-muted-foreground">İşçi sayı</span>
                                                <h6 className="font-bold">{company?.amountWorker}</h6>
                                            </div>
                                        </div>

                                        {
                                            company?.site && (
                                                <div className="flex items-center gap-4">
                                                    <Globe className="text-primary" />
                                                    <div className="lg:text-center">
                                                        <span className="text-muted-foreground">Əlaqə</span>
                                                        <h6 className="font-bold">{company?.site}</h6>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <Skeleton className="w-[480px] h-12" />
                                )
                            }
                            {
                                !isLoading ? (
                                    <Button className="absolute top-0 right-0" >
                                        72 vakansiya
                                        <ArrowRight />
                                    </Button>
                                ) : (
                                    <Skeleton className="absolute top-0 right-0 w-[136px] h-[36px]" />
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="my-6">
                    {
                        !isLoading ? (
                            <h4 className="text-xl lg:text-2xl font-semibold mb-3">Şirkət haqqında</h4>
                        ) : (
                            <Skeleton className="h-8 mb-3" />
                        )
                    }
                    {
                        !isLoading ? (
                            <p className="text-muted-foreground text-sm md:text-base">{company?.description}</p>
                        ) : (
                            <Skeleton className="h-30" />
                        )
                    }

                </div>
            </div>
        </section>
    )
}

export default CompanyAbout