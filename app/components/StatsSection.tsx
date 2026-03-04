'use client'

import { DrupalHomepage } from '@/lib/types'

interface StatsSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

const defaultStats = [
  { value: '50K+', label: 'Lives Impacted' },
  { value: '$12M', label: 'Research Funded' },
  { value: '200+', label: 'Clinical Partners' },
  { value: '15', label: 'Years of Service' },
]

export default function StatsSection({ homepageContent }: StatsSectionProps) {
  const stats = (homepageContent as any)?.stats || (homepageContent as any)?.statsItems || defaultStats

  if (!stats || stats.length === 0) return null

  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200 pt-16">
        <div className="flex flex-wrap items-baseline gap-2">
          {stats.map((stat: any, i: number) => (
            <span key={stat.id || i} className="flex items-baseline gap-2">
              {i > 0 && <span className="text-gray-200">/</span>}
              <span className="font-heading text-2xl md:text-3xl font-bold text-gray-950">{stat.value || stat.statValue}</span>
              <span className="text-sm text-gray-400">{stat.label || stat.statLabel || stat.title}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
