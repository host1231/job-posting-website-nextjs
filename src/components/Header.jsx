"use client"
import { Button } from "@/components/ui/button";
import { BookText, Building, LogOut, User } from "lucide-react";
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
                    <div className="logo w-35 md:w-50">
                        <Link href="/">
                            <Image 
                                src="https://vuxz9tznczckbg5g.public.blob.vercel-storage.com/Logo-lo6v2oUeBqG9OcMtA2GWbBAl2zQBC7.svg" 
                                alt="Logo" 
                                width={0} 
                                height={0}
                                style={{width: "100%", height: "auto"}}
                                priority 
                            />
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <NavMenu />
                    </div>
                    <div className="block md:hidden">
                        <MobileMenu />
                    </div>
                    <div className="hidden btns md:flex items-center gap-5">
                        {
                            session?.user?.role === "admin" && (
                                <Link href="/add-vacancy">
                                    <Button>
                                        <BookText />
                                        Добавить вакансию
                                    </Button>
                                </Link>
                            )
                        }
                        {
                            session?.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="w-10 h-10 cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            {/* <AvatarFallback>{data?.user?.name}</AvatarFallback> */}
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="mt-5 mr-15">
                                        <DropdownMenuLabel>Salam, {session.user.name}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild variant="">
                                            <Link href="/add-vacancy">Добавить вакансию</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild variant="">
                                            <Link href="/add-company">Добавить компанию</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem variant="destructive" onClick={() => signOut({ callbackUrl: "/" })}>
                                            <LogOut />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) :
                                (
                                    <Link variant={"outline"} href="/signin">
                                        <Button variant={"outline"} size={"lg"}>
                                            <User />
                                            Giriş
                                        </Button>
                                    </Link>
                                )
                        }
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header