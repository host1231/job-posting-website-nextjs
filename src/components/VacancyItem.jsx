import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
import { Clock, Eye } from 'lucide-react'
import Link from 'next/link'

const VacancyItem = ({id, title, companyTitle, companyImageUrl, views, createdAt}) => {
    return (
        <Link href={`/${id}`}>
            <Card className="w-full h-full gap-2 md:gap-6">
                <CardHeader className="flex items-center gap-4 md:block">
                    <Avatar className="w-10 h-10 md:w-15 md:h-15 mb-3">
                        <AvatarImage src={companyImageUrl} alt="@shadcn" />
                    </Avatar>
                    <div>
                        <CardTitle className="line-clamp-2">{title}</CardTitle>
                        <CardDescription className="line-clamp-1">{companyTitle}</CardDescription>
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-between items-center text-neutral-400 text-sm">
                    <span className="flex items-center gap-1">
                        <Clock size={15} />
                        {createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                        <Eye size={15} />
                        {views}
                    </span>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default VacancyItem