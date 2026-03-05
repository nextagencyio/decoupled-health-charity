'use client'

import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import ErrorBoundary from './ErrorBoundary'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Shield, Users, Globe, Award, Stethoscope } from 'lucide-react'
import { DrupalHomepage } from '@/lib/types'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

const campaigns = [
  { title: 'Heart Health Initiative', description: 'Combating cardiovascular disease through research', href: '/campaigns' },
  { title: 'Pediatric Care Fund', description: 'Supporting children with chronic conditions', href: '/campaigns' },
  { title: 'Mental Wellness Program', description: 'Breaking barriers to mental health access', href: '/campaigns' },
  { title: 'Community Screening Drives', description: 'Early detection saves lives', href: '/campaigns' },
]

const icons = [
  { icon: Heart, label: 'Heart Health' },
  { icon: Shield, label: 'Protection' },
  { icon: Users, label: 'Community' },
  { icon: Globe, label: 'Global Reach' },
  { icon: Award, label: 'Excellence' },
  { icon: Stethoscope, label: 'Care' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&fit=crop', alt: 'Medical research lab' },
  { src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80&fit=crop', alt: 'Community health screening' },
  { src: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80&fit=crop', alt: 'Healthcare workers with patient' },
  { src: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80&fit=crop', alt: 'Health foundation volunteers' },
]

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-[#fffaf8]">
      <Header />

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Campaigns - List View */}
      <section className="bg-[#fffaf8] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-primary-900 mb-8">Our Campaigns</h2>
          <div className="border-t border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden">
            {campaigns.map((campaign, i) => (
              <Link
                key={i}
                href={campaign.href}
                className="group flex items-center justify-between py-6 border-b border-gray-200 transition-all duration-200 hover:pl-1"
              >
                <div className="flex items-baseline gap-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                    {campaign.title}
                  </h3>
                  <span className="text-sm text-gray-400 hidden sm:inline">{campaign.description}</span>
                </div>
                <span className="text-sm text-gray-400 shrink-0 ml-4">View</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Icon Showcase */}
      <section className="bg-primary-50 py-16 border-y border-primary-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-primary-900 mb-12 text-center">What We Do</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {icons.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <item.icon className="w-6 h-6 text-primary-600 mb-3" strokeWidth={1.5} />
                <span className="text-xs text-gray-500 tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="bg-[#fff2f0] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-primary-900 mb-8">In Action</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      <footer className="bg-primary-950 border-t border-primary-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-300">
              &copy; {new Date().getFullYear()} Wellspring Health Foundation
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/campaigns" className="text-sm text-primary-300 hover:text-white transition-colors">Campaigns</Link>
              <Link href="/research" className="text-sm text-primary-300 hover:text-white transition-colors">Research</Link>
              <Link href="/contact" className="text-sm text-primary-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
