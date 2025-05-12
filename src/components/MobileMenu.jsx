'use client';

import { BriefcaseBusiness, Building, LayoutList, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Drawer } from 'vaul';
import { DrawerDescription } from './ui/drawer';

const MobileMenu = () => {
  return (
    <Drawer.Root direction="left">
      <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full px-3 transition-all border text-muted-foreground">
        <LayoutList />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 rounded-none" />
        <Drawer.Content
          className="left-0 top-0 bottom-0 fixed z-50 outline-none w-[300px] flex"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={{ '--initial-transform': 'calc(100% + 8px)' }}
        >
          {/* <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-2 text-zinc-900">It supports all directions.</Drawer.Title>
              <Drawer.Description className="text-zinc-600 mb-2">
                This one specifically is not touching the edge of the screen, but that&apos;s not required for a side
                drawer.
              </Drawer.Description>
            </div>
          </div> */}

          <div className="bg-white w-full h-full grow p-5 flex flex-col rounded-[16px]">
            <div className="logo">
              <Link href="/">
                <Drawer.Title>
                  <Image
                    src="https://vuxz9tznczckbg5g.public.blob.vercel-storage.com/logo-nyGodazl34R1OIV4ZkMydrTbMRYgdS.svg"
                    alt="Logo"
                    width={0}
                    height={0}
                    style={{ width: "140px", height: "auto" }}
                    priority
                  />
                </Drawer.Title>
              </Link>
            </div>
            <DrawerDescription className="hidden">test</DrawerDescription>
            <nav className="flex flex-col my-5 ">
              <Link href="/" className="flex items-center gap-2 px-3 py-4 hover:bg-amber-100 rounded-md text-muted-foreground hover:text-amber-500">
                <Search size={18} />
                Vakansiyalar
              </Link>
              <Link href="/companies" className="flex items-center gap-2 px-3 py-4 hover:bg-amber-100 rounded-md text-muted-foreground hover:text-amber-500">
                <Building />
                Şirkətlər
              </Link>
              <Link href="/categories" className="flex items-center gap-2 px-3 py-4 hover:bg-amber-100 rounded-md text-muted-foreground hover:text-amber-500">
                <BriefcaseBusiness />
                Kateqoriyalar
              </Link>
            </nav>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default MobileMenu