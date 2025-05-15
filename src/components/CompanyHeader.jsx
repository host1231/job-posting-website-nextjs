import { Avatar, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Globe, MapPinned, Users } from 'lucide-react'
import { Button } from './ui/button'

const CompanyHeader = ({ data, totalVacancies, isLoading, withoutBtn }) => {
    return (
        <div className="border p-6 shadow-md bg-background rounded-md">
            <div className="flex flex-col lg:flex-row items-center gap-6 relative w-full">
                {
                    !isLoading ? (
                        <Avatar className="w-25 h-25 rounded-full lg:w-40 lg:h-40">
                            <AvatarImage src={data?.imageUrl} alt="Logo" />
                        </Avatar>
                    ) : (
                        <Skeleton className="w-25 h-25 rounded-full lg:w-40 lg:h-40" />
                    )
                }
                <div className="w-full">
                    {
                        !isLoading ? (
                            <div className="flex gap-2 justify-center lg:justify-start">
                                <h2 className="title mb-6 text-center lg:text-left">{data?.title}</h2>
                                {
                                    data?.site ? (
                                        <Link href={data?.site}>
                                            <span className="border rounded-md p-1 h-min text-primary">
                                                <Globe />
                                            </span>
                                        </Link>
                                    ) : ""
                                }
                            </div>
                        ) : (
                            <Skeleton className="mx-auto md:mx-0 w-[80%] h-9 mb-6" />
                        )
                    }
                    {
                        !isLoading ? (
                            <div className="flex flex-row gap-10 flex-wrap justify-center lg:justify-start lg:gap-15">
                                <div className="flex items-center gap-4">
                                    <MapPinned className="text-primary" />
                                    <div className="lg:text-center">
                                        <span className="text-muted-foreground">Şəhər</span>
                                        <h6 className="font-bold">{data?.city}</h6>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <CalendarDays className="text-primary" />
                                    <div className="lg:text-center">
                                        <span className="text-muted-foreground">Təsis tarixi</span>
                                        <h6 className="font-bold">{data?.year}</h6>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Users className="text-primary" />
                                    <div className="lg:text-center">
                                        <span className="text-muted-foreground">İşçi sayı</span>
                                        <h6 className="font-bold">{data?.amountWorker}</h6>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Skeleton className="w-full md:w-[40%] h-12" />
                        )
                    }
                    {
                        !withoutBtn && (
                            !isLoading ? (
                                <Link href={`/companies/${data?.slug}/vacancies`}>
                                    <Button className="absolute top-10 -right-15 rotate-90 lg:top-0 lg:right-0 lg:rotate-0" >
                                        {totalVacancies} vakansiya
                                        <ArrowRight />
                                    </Button>
                                </Link>
                            ) : (
                                <Skeleton className="absolute w-[136px] h-[36px] top-10 -right-15 rotate-90 lg:top-0 lg:right-0 lg:rotate-0" />
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CompanyHeader