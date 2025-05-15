import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CategoryItemSkeleton = () => {
    return (
        <Card className="default-card  gap-2 md:gap-6">
            <CardHeader>
                <Skeleton className="w-10 h-10 md:w-15 md:h-15 rounded-full mb-3" />
                <Skeleton className="h-5 md:h-8" />
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
                <Skeleton className="w-[100px] h-6" />
                <Skeleton className="w-6 h-6" />
            </CardFooter>
        </Card>
    )
}

export default CategoryItemSkeleton