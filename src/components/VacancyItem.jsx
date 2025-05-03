import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Clock, Eye } from 'lucide-react'

const VacancyItem = () => {
    return (
        <Card>
            <CardHeader>
                <Avatar className="w-15 h-15 mb-3">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="line-clamp-2">Proqramlaşdırma üzrə baş mütəxəssis (Senior Full-Stack Developer)</CardTitle>
                <CardDescription className="line-clamp-1">Guven Technology LLC</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between items-center text-neutral-400 text-sm">
                <span className="flex items-center gap-1">
                    <Clock size={15} />
                    Bu gün
                </span>
                <span className="flex items-center gap-1">
                    <Eye size={15} />
                    100
                </span>
            </CardFooter>
        </Card>
    )
}

export default VacancyItem