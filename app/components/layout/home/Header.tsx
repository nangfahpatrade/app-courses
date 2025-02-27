'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

type HeaderProps = {
    locale: string;
}

const Header : React.FC<HeaderProps>= ({locale}) => {
    const pathName = usePathname()
    const router = useRouter()

      // เปลี่ยนภาษา
  const handleChangeLanguage = (newLocale : string)=>{
    const path = pathName.split("/").slice(2).join("/")
    router.push(`/${newLocale}/${path}`)
  }
  return (
    <ul className="flex gap-6">
    <li>
        {/* Cannot find name 'locale'. */}
      <Link href={`/${locale}/home`}>Home</Link>
    </li>
    <li>
        {/* Cannot find name 'locale'. */}
      <Link href={`/${locale}/courses`}>Courses</Link>
    </li>
    <li onClick={()=>handleChangeLanguage('th')}>TH</li>
    <li onClick={()=>handleChangeLanguage('en')}>EN</li>
  </ul>
  )
}

export default Header