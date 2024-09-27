'use client'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import Logo from '../../icons/logo.svg'
import Image from "next/image"
import { useState } from "react"
import { ArrowLeft, ArrowRight, Book, BookOpen, Heart, Home } from "lucide-react"
import { usePathname } from "next/navigation"

const NavLinks = [
  {
    id: 1,
    href: '/home',
    title: 'Home',
    icon: Home,
  },
  {
    id: 2,
    href: '/duas',
    title: 'Duas',
    icon: BookOpen,
  },
  {
    id: 3,
    href: '/collections',
    title: 'Collections',
    icon: Heart,
  },
]

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  return (
    <aside className={`h-full relative hidden sm:flex flex-col bg-card transition-width duration-300 ease-in-out ${isExpanded ? 'w-44' : 'w-fit'}`}>
      {/* Logo */}
      <div className="h-[55px] flex p-2">
        <div className={`flex items-center w-full py-2 gap-2 rounded-md ${isExpanded ? "px-1" : "justify-center"}`}>
          <Image src={Logo} alt="Keepify" height={40} width={30} />
          <h1 className={`${isExpanded ? 'block' : 'hidden'} text-lg font-extrabold`}><span className="text-primary">Akhira</span> Journey</h1>
        </div>
      </div>
      <nav className="flex flex-col gap-2 p-2">
        {/* Navigation Links */}
        <TooltipProvider>
          {NavLinks.map((link) => {
            const isActive = link.href === pathname
            return (
              <Tooltip key={link.id}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-4 p-2 rounded-lg transition-colors hover:text-gray-500
                      ${isActive ? 'text-primary' : 'text-gray-400'}`}
                  >
                    <link.icon className="h-6 w-6" />
                    <span className={`${isExpanded ? 'block' : 'hidden'} font-bold`}>{link.title}</span>
                  </Link>
                </TooltipTrigger>
                {!isExpanded && <TooltipContent side="right">{link.title}</TooltipContent>}
              </Tooltip>
            )
          })}
        </TooltipProvider>

        {/* Toggle Button */}
        <div className="mt-auto absolute flex justify-center top-52 -right-[20px]">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center p-1 rounded-md bg-card border transition-transform hover:bg-card"
          >
            {isExpanded ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
          </button>
        </div>
      </nav>
    </aside>
  )
}
