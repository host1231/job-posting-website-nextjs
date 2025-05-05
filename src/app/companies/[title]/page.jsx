"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, CalendarDays, Globe, MapPinned, User, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CompanyAbout = () => {
    const [company, setCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const title = (pathname.replace("/companies/", ""));
    // console.log(title);

    useEffect(() => {
        const getCompany = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/company/${title}`);
                const data = await res.json();

                if (res.ok) {
                    setCompany(data);
                    console.log(company)

                } else {

                }

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        getCompany();
    }, []);

    return (
        <section className="my-10">
            <div className="container">
                <div className="p-6 shadow-md bg-white rounded-md">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 relative w-full">
                        {
                            !isLoading ? (
                                <Avatar className="w-30 h-30 rounded-full lg:w-50 lg:h-50">
                                    <AvatarImage src={company?.imageUrl} alt="Logo" />
                                </Avatar>
                            ) : (
                                <Skeleton className="w-30 h-30 rounded-full lg:w-50 lg:h-50" />
                            )
                        }
                        <div className="">
                            {
                                !isLoading ? (
                                    <h2 className="text-2xl lg:text-4xl font-semibold mb-6">{company?.title}</h2>
                                ) : (
                                    <Skeleton className="w-[500px] h-10 mb-6" />
                                )
                            }
                            {
                                !isLoading ? (
                                    <div className="flex flex-col gap-5 lg:flex-row lg:gap-20">
                                        <div className="flex items-center gap-4">
                                            <MapPinned className="text-amber-500" />
                                            <div className="lg:text-center">
                                                <span className="text-neutral-400">Şəhər</span>
                                                <h6 className="font-bold">{company?.city}</h6>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <CalendarDays className="text-amber-500" />
                                            <div className="lg:text-center">
                                                <span className="text-neutral-400">Təsis tarixi</span>
                                                <h6 className="font-bold">{company?.year}</h6>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Users className="text-amber-500" />
                                            <div className="lg:text-center">
                                                <span className="text-neutral-400">İşçi sayı</span>
                                                <h6 className="font-bold">{company?.amountWorker}</h6>
                                            </div>
                                        </div>

                                        {
                                            company?.site && (
                                                <div className="flex items-center gap-4">
                                                    <Globe className="text-amber-500" />
                                                    <div className="lg:text-center">
                                                        <span className="text-neutral-400">Əlaqə</span>
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

                            {/* <span className="bg-amber-500 text-white font-medium px-4 py-2 rounded-md absolute -top-3 right-13">
                                72 vakansiya
                            </span> */}
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
                <div className="p-6 mt-8 shadow-md bg-white rounded-md">
                    {
                        !isLoading ? (
                            <h4 className="text-xl md:text-2xl font-semibold mb-4">Şirkət haqqında</h4>
                        ) : (
                            <Skeleton className="h-8 mb-4" />
                        )
                    }
                    {
                        !isLoading ? (
                            <p className="text-neutral-500">{company?.description}</p>
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