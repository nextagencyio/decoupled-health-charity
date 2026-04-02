import { getClient } from '@/lib/drupal-client'
import { Metadata } from 'next'
import { GET_CAMPAIGNS } from '@/lib/queries'
import { CampaignsData } from '@/lib/types'
import Header from '../components/Header'
import CampaignCard from '../components/CampaignCard'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Campaigns | Wellspring Health Foundation',
  description: 'Our fundraising campaigns for health research and community care.',
}

async function getCampaigns() {
  try {
    const client = getClient()
    const data = await client.raw(GET_CAMPAIGNS, { first: 50 })
    return data?.nodeCampaigns?.nodes || []
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return []
  }
}

export default async function CampaignsPage() {
  const items = await getCampaigns()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-gray-950 leading-[0.9]">
            Campaigns
          </h1>
          <p className="text-lg text-gray-400 mt-6 max-w-xl">
            Our fundraising initiatives for health research and community care.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Campaigns will appear here once content is imported.</p>
            </div>
          ) : (
            <div className="border-t border-gray-200">
              {items.map((item: any) => (
                <CampaignCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
