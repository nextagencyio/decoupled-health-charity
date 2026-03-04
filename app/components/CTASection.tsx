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
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-950 mb-4">{title}</h2>
        {description && (
          <div className="text-gray-400 mb-8 max-w-xl" dangerouslySetInnerHTML={{ __html: description }} />
        )}
        <a
          href="/contact"
          className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium tracking-wide uppercase hover:bg-gray-900 hover:text-white transition-colors duration-200"
        >
          {primaryLabel}
        </a>
      </div>
    </section>
  )
}
