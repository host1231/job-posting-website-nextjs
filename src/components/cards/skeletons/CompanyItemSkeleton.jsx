import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CompanyItemSkeleton = () => {
  return (
    <Card className="default-card">
        <CardHeader>
          <div className="flex justify-between w-full">
            <Skeleton className="w-14 h-14 md:w-20 md:h-20 rounded-full mb-3" />
            <Skeleton className="w-[101px] h-[26px]" />
          </div>
            <Skeleton className="h-4 " />
            <Skeleton className="h-10 md:h-15" />
        </CardHeader>
    </Card>
  )
}

export default CompanyItemSkeleton