"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const VacancyAbout = () => {
    const pathname = usePathname();
    const id = pathname.replace("/", "");
    useEffect(() => {
        const addViews = async () => {
            try {
                await fetch(`/api/vacancy/${id}/views`, {
                    method: "PATCH"
                });
            } catch (error) {
                console.error(error);
            }
        }
        
        addViews();
    }, [id]);
    return (
        <div>VacancyAbout</div>
    )
}

export default VacancyAbout