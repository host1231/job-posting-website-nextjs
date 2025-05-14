import React from 'react'
import { Card, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

const CompanyItemSkeleton = () => {
  return (
    <Card className="default-card">
        <CardHeader>
          <div className="flex justify-between w-full">
            <Skeleton className="w-20 h-20 rounded-full mb-3" />
            <Skeleton className="w-[101px] h-[26px]" />
          </div>
            <Skeleton className="h-4 " />
            <Skeleton className="h-15" />
        </CardHeader>
    </Card>
  )
}

export default CompanyItemSkeleton