"use client"
import { Button } from "@/components/ui/button";
import { BookText, Building, LogOut, PlusCircle, User, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"
import NavMenu from "./NavMenu";
import { signOut, useSession } from "next-auth/react";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
    const { data: session } = useSession();

    console.log(session)
    return (
        <header className="header py-3 fixed top-0 right-0 w-full bg-background z-40 border-b">
            <div className="container">
                <div className="header__inner flex justify-between items-center">
                    <div className="md:hidden">
                        <MobileMenu />
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="logo w-35 md:w-50">
                            <Link href="/">
                                <Image
                                    src="https://vuxz9tznczckbg5g.public.blob.vercel-storage.com/Logo-lo6v2oUeBqG9OcMtA2GWbBAl2zQBC7.svg"
                                    alt="Logo"
                                    width={0}
                                    height={0}
                                    className="w-full h-auto hover:scale-105 transition-all"
                                    priority
                                />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <NavMenu />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block">
                            {
                                !session?.user ? (
                                    <Link href="/signin" className="hidden md:inline">
                                        <Button variant="outline">
                                            <User />
                                            Giriş
                                        </Button>
                                    </Link>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button>
                                                <UserCheck />
                                                Mənim hesabım
                                            </Button>
                                        </DropdownMenuTrigger>
                                        {
                                            session?.user?.role === "admin" ? (
                                                <DropdownMenuContent className="w-[153.88px]">
                                                    <DropdownMenuLabel>Salam, {session?.user?.name}</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link href="/add-vacancy" className="flex gap-2 items-center text-muted-foreground">
                                                            <PlusCircle />
                                                            Vakansiya
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href="/add-company" className="flex gap-2 items-center text-muted-foreground">
                                                            <PlusCircle />
                                                            Kompaniya
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive"  onSelect={() => signOut({ callbackUrl: "/" })}>
                                                        <LogOut />
                                                        Çıxış
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            ) : (
                                                <DropdownMenuContent className="w-[153.88px]">
                                                    <DropdownMenuLabel>Salam, {session?.user?.name}</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem variant="destructive" onSelect={() => signOut({ callbackUrl: "/" })}>
                                                        <LogOut />
                                                        Çıxış
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            )
                                        }
                                    </DropdownMenu>
                                )
                            }
                        </div>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header