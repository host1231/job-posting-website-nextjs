import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Badge } from './ui/badge'

const CompanyItem = ({ logo, title, slug, description, onClick, vacancyCount }) => {
    const { data: session } = useSession();

    return (
        <Link href={`/companies/${slug}`}>
            <Card className="w-full h-full relative">
                <CardHeader >
                    <div className="flex justify-between w-full">
                        <Avatar className="w-14 h-14 md:w-20 md:h-20 rounded-full border mb-3">
                            <AvatarImage src={logo ? logo : "/vector.svg"} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Badge className="h-min text-xs">{vacancyCount} vakansiya</Badge>
                    </div>
                    <div>
                        <CardTitle className="line-clamp-1 mb-1">{title}</CardTitle>
                        <CardDescription className="line-clamp-2 md:line-clamp-3">
                            {description}
                        </CardDescription>
                    </div>
                </CardHeader>
                {
                    session?.user?.role === "admin" && (
                        <Button variant="ghost" onClick={onClick} className="absolute top-14 right-4 text-red-500 hover:bg-red-200 hover:text-red-500">
                            <Trash />
                        </Button>
                    )
                }
            </Card>
        </Link>
    )
}

export default CompanyItem