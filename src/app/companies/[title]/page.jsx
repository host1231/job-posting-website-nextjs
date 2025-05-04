"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowRight, CalendarDays, Globe, MapPinned, User, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CompanyAbout = () => {
    const [company, setCompany] = useState(null);
    const pathname = usePathname();
    const title = (pathname.replace("/companies/", ""));
    // console.log(title);

    useEffect(() => {
        const getCompany = async () => {
            try {
                const res = await fetch(`/api/company/${title}`);
                const data = await res.json();

                if (res.ok) {
                    setCompany(data);
                    console.log(company)

                } else {

                }

            } catch (error) {
                console.error(error);
            }
        }
        getCompany();
    }, []);

    return (
        <section className="my-10">
            <div className="container">
                <div className="p-6 shadow-md bg-white rounded-md">
                    <div className="flex items-center gap-6">
                        <Avatar className="w-50 h-50 ">
                            <AvatarImage src={company?.imageUrl} alt="Logo" />
                        </Avatar>
                        <div className="relative w-full">
                            <h2 className="text-4xl font-semibold mb-6">{company?.title}</h2>
                            <div className="flex gap-20">
                                <div className="flex items-center gap-4">
                                    <MapPinned className="text-amber-500" />
                                    <div className="text-center">
                                        <span className="text-neutral-400">Şəhər</span>
                                        <h6 className="font-bold">{company?.city}</h6>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <CalendarDays className="text-amber-500" />
                                    <div className="text-center">
                                        <span className="text-neutral-400">Təsis tarixi</span>
                                        <h6 className="font-bold">{company?.year}</h6>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Users className="text-amber-500" />
                                    <div className="text-center">
                                        <span className="text-neutral-400">İşçi sayı</span>
                                        <h6 className="font-bold">{company?.amountWorker}</h6>
                                    </div>
                                </div>

                                {
                                    company?.site && (
                                        <div className="flex items-center gap-4">
                                            <Globe className="text-amber-500" />
                                            <div className="text-center">
                                                <span className="text-neutral-400">Əlaqə</span>
                                                <h6 className="font-bold">{company?.site}</h6>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {/* <span className="bg-amber-500 text-white font-medium px-4 py-2 rounded-md absolute -top-3 right-13">
                                72 vakansiya
                            </span> */}
                            <Button className="absolute -bottom-10 right-0" >
                                72 vakansiya
                                <ArrowRight />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="p-6 mt-8 shadow-md bg-white rounded-md">
                    <h4 className="text-2xl font-semibold mb-4">Şirkət haqqında</h4>
                    <p className="text-neutral-500">{company?.description}</p>
                </div>
            </div>
        </section>
    )
}

export default CompanyAbout