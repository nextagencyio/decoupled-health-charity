'use client'

import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'
import { GET_FEATURED_CAMPAIGNS } from '@/lib/queries'
import { DrupalHomepage, DrupalCampaign } from '@/lib/types'
import { Target, ArrowRight } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface CampaignsPreviewProps {
  homepageContent?: DrupalHomepage | null
}

interface FeaturedCampaignsData {
  nodeCampaigns: {
    nodes: DrupalCampaign[]
  }
}

const FEATURED_CAMPAIGNS_DOC = gql`${GET_FEATURED_CAMPAIGNS}`

export default function CampaignsPreview({ homepageContent }: CampaignsPreviewProps) {
  const { data, loading, error } = useQuery<FeaturedCampaignsData>(FEATURED_CAMPAIGNS_DOC)

  const campaigns = data?.nodeCampaigns?.nodes || []
  const sectionTitle = homepageContent?.featuredCampaignsTitle || 'Current Campaigns'

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || campaigns.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Support our active campaigns and help us make a difference in the lives of those who need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => {
            const goalNum = campaign.goalAmount ? parseFloat(campaign.goalAmount.replace(/[$,]/g, '')) : 0
            const raisedNum = campaign.raisedAmount ? parseFloat(campaign.raisedAmount.replace(/[$,]/g, '')) : 0
            const progress = goalNum > 0 ? Math.min(Math.round((raisedNum / goalNum) * 100), 100) : 0

            return (
              <Link
                key={campaign.id}
                href={campaign.path || `/campaigns/${campaign.id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-red-600 to-rose-700">
                  {campaign.image?.url ? (
                    <ResponsiveImage
                      src={campaign.image.url}
                      alt={campaign.image.alt || campaign.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      variations={campaign.image.variations}
                      targetWidth={400}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Target className="w-16 h-16 text-white/50" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {campaign.healthArea && campaign.healthArea.length > 0 && (
                    <div className="text-sm text-red-700 font-medium mb-2">
                      {campaign.healthArea[0].name}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
                    {campaign.title}
                  </h3>

                  {campaign.goalAmount && (
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{campaign.raisedAmount} raised</span>
                        <span>{progress}%</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center text-red-700 font-medium group-hover:gap-2 transition-all">
                    Support this campaign
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/campaigns"
            className="inline-flex items-center px-8 py-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors font-semibold"
          >
            View All Campaigns
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
