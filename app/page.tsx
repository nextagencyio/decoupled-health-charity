import { getClient } from '@/lib/drupal-client'
import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { checkConfiguration } from '../lib/config-check'
import { GET_HOMEPAGE_DATA } from '@/lib/queries'

export const revalidate = 3600
export const dynamic = 'force-dynamic'


export async function generateMetadata(): Promise<Metadata> {
  const title = 'Wellspring Health Foundation - Every Heartbeat Matters'
  const description = 'We fund life-saving research, support families in crisis, and build healthier communities. Join us in the fight against heart disease, cancer, and chronic illness.'

  return {
    title,
    description,
    keywords: ['Health Charity', 'Heart Disease', 'Cancer Research', 'Community Health', 'Nonprofit', 'Donate'],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Home() {
  const configStatus = checkConfiguration()

  if (!configStatus.isConfigured) {
    return <SetupGuide missingVars={configStatus.missingVars} />
  }

  const client = getClient()
  let homepageContent: any = null

  try {
    const data = await client.raw(GET_HOMEPAGE_DATA)
    homepageContent = data?.nodeHomepages?.nodes?.[0] || null
  } catch (error) {
    console.error('Error fetching homepage:', error)
  }

  if (!homepageContent) {
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }

  return <HomepageRenderer homepageContent={homepageContent} />
}
