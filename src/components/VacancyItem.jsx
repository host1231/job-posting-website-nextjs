"use client"

import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
import { Clock, Eye, Trash } from 'lucide-react'
import Link from 'next/link'
import { toSlug } from '@/lib/slug'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'

const VacancyItem = ({ id, title, companyTitle, companyImageUrl, views, createdAt, slug, onClick, salary }) => {
    const { data: session } = useSession();
    return (
        <Link href={`/${slug}`}>
            <Card className="w-full h-full gap-2 md:gap-6 justify-between relative">
                <CardHeader className="flex items-center gap-4 md:block">
                    <Avatar className="w-10 h-10 md:w-15 md:h-15 mb-3">
                        <AvatarImage src={companyImageUrl} alt="@shadcn" />
                    </Avatar>
                    <div>
                        <CardTitle className="line-clamp-2 mb-1">{title}</CardTitle>
                        <CardDescription className="line-clamp-1">{companyTitle}</CardDescription>
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-between items-center text-muted-foreground text-sm">
                    <span className="flex items-center gap-1">
                        <Clock size={15} />
                        {createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                        <Eye size={15} />
                        {views}
                    </span>
                </CardFooter>
                {
                    session?.user?.role === "admin" && (
                        <Button variant="ghost" onClick={onClick} className="absolute top-4 right-4 text-red-500 hover:bg-red-200 hover:text-red-500">
                            <Trash />
                        </Button>
                    )
                }
                {
                    salary && (
                        <span className={cn("flex items-center gap-1 absolute top-4 right-6 text-lg text-muted-foreground font-light", session?.user?.role === "admin" && "top-10 right-7")}>
                            {/* <Eye size={15} /> */}
                            ₼
                        </span>
                    )
                }

            </Card>
        </Link>
    )
}

export default VacancyItem