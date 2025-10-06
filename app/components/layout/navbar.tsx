"use client";
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:text-gold transition-colors"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6" name='Light Mode' />
      ) : (
        <MoonIcon className="h-6 w-6" name='Dark Mode' />
      )}
    </button>
  )
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Handle hash navigation when page loads
    if (window.location.hash === '#about') {
      setTimeout(() => {
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    if (pathname === '/') {
      // If already on homepage, just scroll to about section
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If on different page, navigate to homepage with hash
      router.push('/#about')
    }
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const footer = document.querySelector('footer')
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '#', onClick: handleAboutClick },
    { name: 'Contact', href: '#', onClick: handleContactClick },
  ]

  return (
    <nav className="bg-navy text-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-wide">JustHoney</h1>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navigation.map((item) => (
                item.name === 'About' || item.name === 'Contact' ? (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="hover:text-gold transition-colors px-1 py-2 rounded-md text-md font-medium"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="hover:text-gold transition-colors px-1 py-2 rounded-md text-md font-medium"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>

            <div className="flex items-center space-x-4 ml-6 border-l border-white/20 pl-6">
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:text-gold focus:outline-none"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-navy">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div className="flex justify-end items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:text-gold"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {navigation.map((item) => (
              item.name === 'About' || item.name === 'Contact' ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="block px-3 py-2 hover:text-gold rounded-md text-base font-medium w-full text-left"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 hover:text-gold rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}

          </div>
        </div>
      )}
    </nav>
  )
}