'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Drawer } from 'vaul';
import { DrawerDescription } from './ui/drawer';
import { useState } from 'react';
import { menuItems } from '@/constant/data';
import { LayoutList, User, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const pathname = usePathname();

  const handleLinkClick = () => {
    setOpen(false);
  }

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} direction="top">

      <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full px-3 transition-all border text-muted-foreground">
        <LayoutList />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 rounded-none" />
        <Drawer.Content
          className="left-0 top-16 bottom-0 fixed z-50 outline-none w-full flex"
          style={{ '--initial-transform': 'calc(100% + 8px)' }}
        >
          <div className="bg-white w-full h-full grow p-5 flex flex-col ">
            {/* <div className="logo mb-10">
              <Link href="/">
                <Drawer.Title>
                  <Image
                    src="https://vuxz9tznczckbg5g.public.blob.vercel-storage.com/Logo-lo6v2oUeBqG9OcMtA2GWbBAl2zQBC7.svg"
                    alt="Logo"
                    width={0}
                    height={0}
                    style={{ width: "140px", height: "auto" }}
                    priority
                  />
                </Drawer.Title>
              </Link>
            </div> */}
            <Drawer.Title className="hidden">Test</Drawer.Title>
            <DrawerDescription className="mb-2 font-light">Sizin HiJobsAz</DrawerDescription>

            <nav className="flex flex-col">
              {
                menuItems.map(menuItem => {
                  const Icon = menuItem.icon;
                  const isActive = pathname === menuItem.href;

                  return (
                    <Link key={menuItem.id}
                      onClick={handleLinkClick}
                      href={menuItem.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold  hover:text-primary",
                        isActive && "bg-primary text-white"
                      )}>
                      {/* <Search size={14} /> */}
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
                  <h6>Salam, {session.user.name}</h6>
                ) : (
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
          <Drawer.Close>
            <X className="absolute z-200 top-0 right-6 text-muted-foreground" />
          </Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default MobileMenu