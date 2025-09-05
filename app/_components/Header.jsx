import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function Header() {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <Link href={'/'}>
            <Image src={"/logo.png"} width={40} height={40} alt="icon" />
        </Link>
        <h1 className="text-base font-bold md:text-2xl">MockMate</h1>
      </div>
      <Link href={'/dashboard'}>
        <Button size={'lg'} className="cursor-pointer flex w-32 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Get Started
        </Button>
      </Link>
    </nav>
  );
}

export default Header
