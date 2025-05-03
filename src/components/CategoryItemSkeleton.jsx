import React from 'react'
import { Card, CardFooter, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

const CategoryItemSkeleton = () => {
    return (
        <Card className="default-card">
            <CardHeader>
                <Skeleton className="w-15 h-15 rounded-full mb-3" />
                <Skeleton className="h-8" />
            </CardHeader>
            <CardFooter className="flex justify-between items-center text-neutral-400 text-sm">
                <Skeleton className="w-[100px] h-6" />
                <Skeleton className="w-6 h-6" />
            </CardFooter>
        </Card>
    )
}

export default CategoryItemSkeleton