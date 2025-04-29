"use-client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const menuItems = [
    { id: 1, href: "/", label: "Vakansiyalar" },
    { id: 2, href: "/companies", label: "Şirkətlər" },
    { id: 3, href: "/categories", label: "Kateqoriyalar" },
]

const NavMenu = () => {
    const pathname = usePathname();
    return (
        <nav className="nav flex gap-5">
            {

                menuItems.map(menuItem => {
                    const isActive = pathname === menuItem.href;
                    console.log(isActive)

                    return (<Link key={menuItem.id} href={menuItem.href} className={cn(isActive ? "text-amber-500" : "text-neutral-400", "link-primary")}>{menuItem.label}</Link>)
                })
            }
        </nav>
    )
}

export default NavMenu