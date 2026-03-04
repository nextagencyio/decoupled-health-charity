'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(0)

  useEffect(() => {
    const banner = document.querySelector('[data-demo-banner]')
    if (banner) {
      const update = () => setBannerHeight((banner as HTMLElement).offsetHeight)
      update()
      const observer = new MutationObserver(update)
      observer.observe(banner, { attributes: true, childList: true, subtree: true })
      window.addEventListener('resize', update)
      return () => { observer.disconnect(); window.removeEventListener('resize', update) }
    }
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
      className="fixed w-full z-50 bg-white/80 backdrop-blur-sm"
      style={{ top: bannerHeight }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-heading font-bold tracking-tight text-gray-900 hover:text-primary-600 transition-colors">
            Wellspring
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors duration-200 ${
                  isActive(item.href) ? 'text-primary-600' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-gray-400 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-100 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm ${
                  isActive(item.href) ? 'text-primary-600' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
