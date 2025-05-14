"use-client"
import { menuItems } from '@/constant/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const NavMenu = () => {
    const pathname = usePathname();
    return (
        <nav className="nav flex gap-5">
            {

                menuItems.map(menuItem => {
                    const isActive = pathname === menuItem.href;
                    return (<Link key={menuItem.id} href={menuItem.href} className={cn(isActive ? "text-primary" : "text-muted-foreground", "link-primary")}>{menuItem.label}</Link>)
                })
            }
        </nav>
    )
}

export default NavMenu