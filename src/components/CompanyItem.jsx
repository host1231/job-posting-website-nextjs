import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'

const CompanyItem = ({ logo, title, description }) => {
    return (
        <Link href={`/companies/${encodeURIComponent(title)}`}>
            <Card>
                <CardHeader>
                    <Avatar className="w-20 h-20 rounded-full border mb-3">
                        <AvatarImage src={logo ? logo : "/vector.svg"} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                        {description}
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default CompanyItem