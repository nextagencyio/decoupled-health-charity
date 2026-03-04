'use client'

import Image from 'next/image'
import { DrupalHomepage } from '@/lib/types'

interface HeroSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const title = (homepageContent as any)?.heroTitle || (homepageContent as any)?.title || 'Every heartbeat matters'
  const subtitle = (homepageContent as any)?.heroSubtitle || 'Funding research, supporting families, building healthier communities.'

  return (
    <section className="bg-white pt-32 pb-16 md:pt-48 md:pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-950 leading-[0.9]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-400 mt-6 max-w-2xl">
            {subtitle}
          </p>
        )}
        <div className="mt-12 relative aspect-[16/9] max-w-3xl rounded-sm overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&fit=crop"
            alt="Healthcare professionals collaborating"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  )
}
