import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'

const CompanyItem = ({ logo, title, description, onClick }) => {
    return (
        <Link href={`/companies/${encodeURIComponent(title)}`}>
            <Card className="w-full h-full relative">
                <CardHeader>
                    <Avatar className="w-20 h-20 rounded-full border mb-3">
                        <AvatarImage src={logo ? logo : "/vector.svg"} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardTitle className="line-clamp-1">{title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                        {description}
                    </CardDescription>
                </CardHeader>
                <Button variant="ghost" onClick={onClick} className="absolute top-4 right-4 text-red-500 hover:bg-red-200 hover:text-red-500">
                    <Trash />
                </Button>
            </Card>
        </Link>
    )
}

export default CompanyItem