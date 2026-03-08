import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_RESEARCH_PROJECT_BY_PATH } from '@/lib/queries'
import { DrupalResearchProject } from '@/lib/types'
import Header from '../../components/Header'
import ResponsiveImage from '../../components/ResponsiveImage'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 300
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface ResearchProjectByPathData {
  route: {
    entity: DrupalResearchProject
  } | null
}

async function getResearchProject(path: string): Promise<DrupalResearchProject | null> {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<ResearchProjectByPathData>({
      query: GET_RESEARCH_PROJECT_BY_PATH,
      variables: { path },
      fetchPolicy: 'cache-first',
    })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching research project:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/research/${slug.join('/')}`
  const item = await getResearchProject(path)

  if (!item) {
    return { title: 'Research Project Not Found | Wellspring Health Foundation' }
  }

  return {
    title: `${item.title} | Wellspring Health Foundation`,
    description: ((item as any).body?.processed ? (item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 160) : '') || `Learn more about ${item.title}.`,
  }
}

export default async function ResearchProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const path = `/research/${slug.join('/')}`
  const item = await getResearchProject(path)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-48 md:pb-24">
        <Link
          href="/research"
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Research
        </Link>

        <article>
          {(item as any).image?.url && (
            <div className="mb-8 rounded-sm overflow-hidden">
              <ResponsiveImage
                src={(item as any).image.url}
                alt={(item as any).image.alt || item.title}
                fill
                className="object-cover"
                variations={(item as any).image.variations}
                targetWidth={800}
              />
            </div>
          )}

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-950 leading-[0.95] mb-8">
            {item.title}
          </h1>

          {(item as any).leadResearcher && (
            <p className="text-sm text-gray-400 mb-8">Lead: {(item as any).leadResearcher}</p>
          )}

          {(item as any).body?.processed && (
            <div
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-primary-600"
              dangerouslySetInnerHTML={{ __html: (item as any).body.processed }}
            />
          )}
        </article>
      </main>
    </div>
  )
}
