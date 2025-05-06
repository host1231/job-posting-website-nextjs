"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getFormattedDate } from '@/lib/formattedDate';
import { fromSlug } from '@/lib/slug';
import { Clock, Eye, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const VacancyAbout = () => {
    const [vacancy, setVacancy] = useState(null);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const slug = pathname.replace("/", "");

    useEffect(() => {
        const addViews = async () => {
            try {
                await fetch(`/api/vacancy/${slug}`, {
                    method: "PATCH"
                });
            } catch (error) {
                console.error(error);
            }
        }


        const getVacancy = async () => {
            try {
                const res = await fetch(`/api/vacancy/${slug}`);
                const data = await res.json();
                console.log(data);
                setVacancy(data);
            } catch (error) {
                console.error(error);
            }
        }

        addViews();
        getVacancy();

    

    }, [slug]);

    const getEmail = () => {
        setOpen(true);
        window.navigator.clipboard.writeText(vacancy.email)
        toast.success(`Почта скопирован!`);
    }

    return (
        <section className="py-10">
            <div className="container">
                {
                    vacancy && (
                        <div>
                            <div className="flex gap-6 flex-col lg:flex-row">
                                <div className="flex-1/2">
                                    <div className="border flex-1/2 p-6 rounded-md h-min bg-white shadow-md">
                                        <div className="flex  items-center gap-5">
                                            <Avatar className="w-30 h-30">
                                                <AvatarImage src={vacancy.company.imageUrl} alt={vacancy.company.title} />
                                            </Avatar>
                                            <div>
                                                <div className="mb-3">
                                                    <h2 className="text-2xl lg:text-4xl font-semibold mb-2">{vacancy.title}</h2>
                                                    <p className="text-muted-foreground font-medium">{vacancy.company.title}</p>
                                                </div>
                                                <div className="flex gap-3 items-center text-muted-foreground text-sm">
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={16} />
                                                        {getFormattedDate(vacancy.createdAt)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Eye size={16} />
                                                        {vacancy.views}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-5">
                                        {
                                            vacancy?.categories?.map(category => (
                                                <span key={category._id} className='bg-[#ffd492] text-sm text-muted-foreground p-2 rounded-md'>{category.title}</span>
                                            ))
                                        }
                                    </div>
                                    <div className="my-10">
                                        <div className="my-5">
                                            <h4 className="text-xl md:text-2xl font-semibold mb-4">Təsvir</h4>
                                            <p className="text-muted-foreground">{vacancy.description}</p>
                                        </div>
                                        <div className="my-5">
                                            <h4 className="text-xl md:text-2xl font-semibold mb-4">Tələblər</h4>
                                            <p className="text-muted-foreground">{vacancy.requirements}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border flex-1 p-6 rounded-md h-min bg-white shadow-md">
                                    <h4 className="text-xl font-semibold text-center mb-3">Vakansiya haqqında</h4>
                                    <div className="border-b mb-3"></div>
                                    <div className="flex flex-col gap-4 my-5">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Paylaşılıb</p>
                                            <h6 className="font-semibold">{getFormattedDate(vacancy.createdAt, true)}</h6>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Son tarix</p>
                                            <h6 className="font-semibold">{getFormattedDate(vacancy.createdAt, true)}</h6>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Vakansiya növü</p>
                                            <h6 className="font-semibold">{vacancy.type}</h6>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Təcrübə</p>
                                            <h6 className="font-semibold">{vacancy.experience}</h6>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Təhsil</p>
                                            <h6 className="font-semibold">{vacancy.education}</h6>
                                        </div>
                                    </div>
                                    <Button className="w-full" onClick={getEmail}>
                                        <Send />
                                        {open ? vacancy.email : "Muraciət et"}
                                    </Button>
                                </div>

                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default VacancyAbout