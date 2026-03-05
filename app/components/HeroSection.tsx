'use client'

import Image from 'next/image'
import Link from 'next/link'
import { DrupalHomepage } from '@/lib/types'

interface HeroSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const title = (homepageContent as any)?.heroTitle || (homepageContent as any)?.title || 'Every heartbeat matters'
  const subtitle = (homepageContent as any)?.heroSubtitle || 'Funding research, supporting families, building healthier communities.'

  return (
    <section className="relative bg-primary-900 overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80&fit=crop"
          alt="Healthcare professionals collaborating"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/85 via-primary-900/75 to-primary-800/60" />
      </div>

      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-500/10 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-200 rounded-full text-xs font-semibold tracking-wide uppercase mb-6 border border-accent-400/30">
            Health Foundation
          </span>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-primary-100/90 mt-6 max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/campaigns"
              className="px-8 py-3.5 bg-accent-500 text-white rounded-full font-semibold text-sm hover:bg-accent-600 transition-colors duration-200 shadow-lg shadow-accent-500/25"
            >
              Our Campaigns
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-white/10 text-white rounded-full font-semibold text-sm border border-white/25 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
