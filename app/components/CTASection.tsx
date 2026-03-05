'use client'

import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Join our mission'
  const description = (homepageContent as any)?.ctaDescription?.processed || ''
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Get Involved'

  return (
    <section className="bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent-500/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-700/20 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">{title}</h2>
        {description && (
          <div className="text-primary-200 mb-8 max-w-xl mx-auto text-lg" dangerouslySetInnerHTML={{ __html: description }} />
        )}
        {!description && (
          <p className="text-primary-200 mb-8 max-w-xl mx-auto text-lg">
            Together, we can fund critical research, support families in need, and build a healthier future for all.
          </p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/contact"
            className="inline-block px-8 py-3.5 bg-accent-500 text-white rounded-full font-semibold text-sm hover:bg-accent-600 transition-colors duration-200 shadow-lg shadow-accent-500/25"
          >
            {primaryLabel}
          </a>
          <a
            href="/campaigns"
            className="inline-block px-8 py-3.5 bg-white/10 text-white rounded-full font-semibold text-sm border border-white/25 hover:bg-white/20 transition-colors duration-200"
          >
            View Campaigns
          </a>
        </div>
      </div>
    </section>
  )
}
