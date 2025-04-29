import Link from 'next/link'
import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className="flex gap-10 h-screen">
            <div className="p-8 hidden lg:block flex-1 bg-amber-100"></div>
            <div className="p-8 flex-1">
                {children}
                <nav className="nav flex justify-center items-end gap-5">
                    <Link href="/" className="link-primary">Vakansiyalar</Link>
                    <Link href="/" className="link-primary">Şirkətlər</Link>
                    <Link href="/" className="link-primary">Kateqoriyalar</Link>
                </nav>
            </div>
        </div>
    )
}

export default AuthLayout