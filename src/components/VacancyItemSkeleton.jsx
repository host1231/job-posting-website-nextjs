import React from 'react'
import { Card, CardFooter, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

const VacancyItemSkeleton = () => {
    return (
        <Card className="gap-2 md:gap-6 justify-between relative">
            <CardHeader className="flex items-center gap-4 md:block w-full">
                <Skeleton className="w-10 h-10 md:w-15 md:h-15 mb-3 rounded-full" />
                <div className="w-[80%]">
                    <Skeleton className="h-4 mb-1" />
                    <Skeleton className="h-5" />
                </div>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
                <Skeleton className="w-[65px] h-5" />
                <Skeleton className="w-[42px] h-5" />
            </CardFooter>
        </Card>
    )
}

export default VacancyItemSkeleton