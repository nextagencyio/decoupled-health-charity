'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const banner = document.querySelector('[class*="bg-amber-500"]') as HTMLElement | null
    if (banner) {
      const update = () => setBannerHeight(banner.offsetHeight)
      update()
      const observer = new MutationObserver(update)
      observer.observe(banner, { attributes: true, childList: true, subtree: true })
      window.addEventListener('resize', update)
      return () => { observer.disconnect(); window.removeEventListener('resize', update) }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Campaigns', href: '/campaigns' },
    { label: 'Research', href: '/research' },
    { label: 'Events', href: '/events' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-white/80 backdrop-blur-sm'
      }`}
      style={{ top: bannerHeight }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-heading font-bold tracking-tight text-primary-900 hover:text-primary-600 transition-colors">
            Wellspring
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2 bg-accent-500 text-white text-sm font-semibold rounded-full hover:bg-accent-600 transition-colors duration-200 shadow-sm"
            >
              Donate
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-gray-700 hover:text-primary-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-100 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-3 text-sm font-medium rounded-lg ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-3 mx-3 px-5 py-2.5 bg-accent-500 text-white text-sm font-semibold rounded-full text-center hover:bg-accent-600 transition-colors"
            >
              Donate
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
