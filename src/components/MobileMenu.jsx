'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Drawer } from 'vaul';
import { DrawerDescription } from './ui/drawer';
import { useState } from 'react';
import { menuItems } from '@/constant/data';
import { AlignLeft, LayoutList, LogOut, User, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import { ModeToggle } from './ModeToggle';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const pathname = usePathname();

  const handleLinkClick = () => {
    setOpen(false);
  }

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} direction="left">
      <Drawer.Trigger asChild>
        <Button>
          <AlignLeft />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 rounded-none" />
        <Drawer.Content
          className="left-0 top-[65.78px] bottom-0 fixed z-39 outline-none w-[280px] flex border-r"
          style={{ '--initial-transform': 'calc(100% + 8px)' }}
        >
          <div className="bg-background w-full h-full grow p-5 flex flex-col ">
            <Drawer.Title className="hidden">Test</Drawer.Title>
            <DrawerDescription className="mb-2 font-light">Sizin HiJobsAz</DrawerDescription>

            <nav className="flex flex-col gap-2">
              {
                menuItems.map(menuItem => {
                  const isActive = pathname === menuItem.href;

                  return (
                    <Link key={menuItem.id}
                      onClick={handleLinkClick}
                      href={menuItem.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold  hover:text-primary",
                        isActive && "bg-primary text-background"
                      )}>
                      {menuItem.icon}
                      {menuItem.label}
                    </Link>
                  )
                })
              }
            </nav>
            <div className="border-b my-6"></div>
            <div>
              {
                session?.user ? (
                  <h6 className="font-medium">Salam, {session.user.name}</h6>
                ) : (
                  <Link variant={"outline"} href="/signin">
                    <Button variant={"outline"} size={"lg"} className="w-full">
                      <User />
                      Giriş
                    </Button>
                  </Link>
                )
              }
            </div>
            <div className="my-6">
              {
                session?.user && (
                  <Button className="w-full" variant="destructive" onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut />
                    Çıxış
                  </Button>
                )
              }
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default MobileMenu