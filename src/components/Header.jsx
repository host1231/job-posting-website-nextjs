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
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import NavMenu from "./NavMenu";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
    const { data } = useSession();
    console.log(data)
    return (
        <header className="header  shadow-md py-6 fixed top-0 right-0 w-full bg-white z-40">
            <div className="container">
                <div className="header__inner flex justify-between items-center">
                    <div className="logo">
                        <Image src="next.svg" alt="Logo" width={120} height={40} />
                    </div>
                    <NavMenu />
                    <div className="btns flex items-center gap-5">
                        <Link href="/add-vacancy">
                        <Button>
                            <BookText />
                            Добавить вакансию
                        </Button>
                        </Link>
                        {
                            data?.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="w-10 h-10 cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            {/* <AvatarFallback>{data?.user?.name}</AvatarFallback> */}
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="mt-5 mr-15">
                                        <DropdownMenuLabel>Salam, {data?.user?.name}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Vakansiyalarım</DropdownMenuItem>
                                        <DropdownMenuItem asChild variant="">
                                            <Link href="/add-company">Şirkətim</Link>
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

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header