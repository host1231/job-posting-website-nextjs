"use client"
import CompanyHeader from '@/components/CompanyHeader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCompaniesBySlugQuery } from '@/services/vacancy'
import { ArrowRight, CalendarDays, Globe, MapPinned, User, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CompanyAbout = () => {
    const pathname = usePathname();
    const slug = (pathname.replace("/companies/", ""));

    const { data, error, isLoading } = useGetCompaniesBySlugQuery(slug);

    return (
        <section className="my-10">
            <div className="container">
                <CompanyHeader data={data?.company} totalVacancies={data?.totalVacancies} isLoading={isLoading} />
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
                            <p className="text-muted-foreground text-sm md:text-base">{data?.company?.description}</p>
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