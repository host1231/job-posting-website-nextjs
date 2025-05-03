"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import Header from './Header';

const HeaderWrapper = () => {
    const pathname = usePathname();
    const hideHeaderRoutes = ["/signin", "/signup"];
    if (hideHeaderRoutes.includes(pathname)) return null;
    else return <div className="pt-[88px]"><Header /></div>
}

export default HeaderWrapper