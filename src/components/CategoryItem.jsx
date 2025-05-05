import React from 'react'
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { ArrowRight, Trash } from 'lucide-react'
import Link from 'next/link'

const CategoryItem = ({title, logo, onClick}) => {
    return (
        <Link href={`/?category=${title}`}>
            <Card className="relative w-full h-full">
                <CardHeader>
                    <Avatar className="w-15 h-15 rounded-md  mb-3">
                        <AvatarImage className="bg-cover" src={logo ? logo : "/vector.svg"} alt="@shadcn" />
                    </Avatar>
                    <CardTitle className="line-clamp-2">{title}</CardTitle>
                    <Button variant="ghost" onClick={onClick} className="absolute top-4 right-4 text-red-500 hover:bg-red-200 hover:text-red-500">
                        <Trash />
                    </Button>
                </CardHeader>
                <CardFooter className="flex justify-between items-center ">
                    <span className="text-neutral-400">86 vakansiya</span>
                    <ArrowRight className="" />
                </CardFooter>
            </Card>
        </Link>
    )
}

export default CategoryItem