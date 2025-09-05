"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [])
  

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800 bg-secondary shadow-md">
      <div className="flex items-center gap-2">
        <Link href={'/'} className='flex items-center'>
          <Image src={'/logo.png'} alt='logo' width={40} height={40} />
          <h1 className="text-base font-bold md:text-2xl">MockMate</h1>
        </Link>        
      </div>

      <ul className=' hidden md:flex gap-6 items-center'>
        <li className={`text-lg hover:scale-105 cursor-pointer hover:text-slate-600 hover:font-bold transition-all 
            ${path == '/dashboard' && 'text-slate-600 font-bold text-lg'}`}>
            <Link href={'/dashboard'}>
              Dashboard
            </Link>
        </li>
        <li className={`text-lg hover:scale-105 cursor-pointer hover:text-slate-600 hover:font-bold transition-all 
            ${path == '/upgrade' && 'text-slate-600 font-bold text-lg'}`}>
            <Link href={'/upgrade'}>
              Upgrade
            </Link>
        </li>
        <li className={`text-lg hover:scale-105 cursor-pointer hover:text-slate-600 hover:font-bold transition-all 
            ${path == '/working' && 'text-slate-600 font-bold text-lg'}`}>
            <Link href={'/dashboard'}>
              How it Works?
            </Link>
        </li>
      </ul>
     
      <UserButton/>
    </nav>
  )
}

export default Header
