import React from 'react'
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { ArrowRight, Trash } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const CategoryItem = ({ id, title, slug, logo, onClick, vacanciesCount }) => {
    const { data: session } = useSession();

    return (
        <Link href={`/?category=${slug}`}>
            <Card className="relative w-full h-full justify-between gap-2 md:gap-6">
                <CardHeader>
                    <Avatar className="w-10 h-10 md:w-15 md:h-15 mb-3 rounded-md">
                        <AvatarImage className="bg-cover" src={logo ? logo : "/vector.svg"} alt="@shadcn" />
                    </Avatar>
                    <CardTitle className="line-clamp-2">{title}</CardTitle>
                    {
                        session?.user?.role === "admin" && (
                            <Button variant="ghost" onClick={onClick} className="absolute top-4 right-4 text-red-500 hover:bg-red-200 hover:text-red-500">
                                <Trash />
                            </Button>
                        )
                    }

                </CardHeader>
                <CardFooter className="flex justify-between items-center ">
                    <span className="text-muted-foreground">{vacanciesCount} vakansiya</span>
                    <ArrowRight className="" />
                </CardFooter>
            </Card>
        </Link>
    )
}

export default CategoryItem