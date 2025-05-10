import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'

const CompanyItem = ({ logo, title, slug, description, onClick }) => {
    const { data: session } = useSession();

    return (
        <Link href={`/companies/${slug}`}>
            <Card className="w-full h-full relative">
                <CardHeader className="flex flex-row items-center md:flex-col md:items-start gap-3">
                    <Avatar className="w-14 h-14 md:w-20 md:h-20 rounded-full border mb-3">
                        <AvatarImage src={logo ? logo : "/vector.svg"} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="line-clamp-1 mb-1">{title}</CardTitle>
                        <CardDescription className="line-clamp-2 md:line-clamp-3">
                            {description}
                        </CardDescription>
                    </div>
                </CardHeader>
                {
                    session?.user?.role === "admin" && (
                        <Button variant="ghost" onClick={onClick} className="absolute top-4 right-4 text-red-500 hover:bg-red-200 hover:text-red-500">
                            <Trash />
                        </Button>
                    )
                }
            </Card>
        </Link>
    )
}

export default CompanyItem