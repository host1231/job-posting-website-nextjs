import ChartVacancies from '@/components/ChartContainer'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className="flex gap-10 h-screen">
            <div className="p-8 hidden lg:block flex-1 bg-primary">
                <div className="mb-10">
                    <Link href="/">
                            <Image 
                                src="https://vuxz9tznczckbg5g.public.blob.vercel-storage.com/Logo-white-9sShdWndA4kfwZnl8Guh2DS4QHFddb.svg" 
                                alt="Logo" 
                                width={0} 
                                height={0}
                                style={{width: "300px", height: "auto"}}
                                priority 
                            />
                        </Link>
                </div>
                <div className="">
                    <Image src="https://vuxz9tznczckbg5g.public.blob.vercel-storage.com/findJobs-DKgki1B9Rwne15oNXCp4qS6HQvNnGJ.png" alt="HiJobsAz" width={480} height={0} className="mx-auto animate-pulse" />
                </div>
            </div>
            <div className="p-3 md:p-8 flex-1">
                {children}
                <nav className="nav flex justify-center items-end gap-5">
                    <Link href="/" className="link-primary text-muted-foreground">Vakansiyalar</Link>
                    <Link href="/companies" className="link-primary text-muted-foreground">Şirkətlər</Link>
                    <Link href="/categories" className="link-primary text-muted-foreground">Kateqoriyalar</Link>
                </nav>
            </div>
        </div>
    )
}

export default AuthLayout