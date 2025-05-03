import React from 'react'
import { Card, CardFooter, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

const VacancyItemSkeleton = () => {
    return (
        <Card className="default-card">
            <CardHeader>
                <Skeleton className="w-15 h-15 rounded-full mb-3" />
                <Skeleton className="h-8" />
                <Skeleton className="h-5" />
            </CardHeader>
            <CardFooter className="flex justify-between items-center text-neutral-400 text-sm">
                <Skeleton className="w-[65px] h-5" />
                <Skeleton className="w-[42px] h-5" />
            </CardFooter>
        </Card>
    )
}

export default VacancyItemSkeleton