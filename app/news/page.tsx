import { getClient } from '@/lib/drupal-client'
import { Metadata } from 'next'
import { GET_NEWS } from '@/lib/queries'
import { NewsData } from '@/lib/types'
import Header from '../components/Header'
import NewsCard from '../components/NewsCard'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'News | Wellspring Health Foundation',
  description: 'Latest news from our foundation and health community.',
}

async function getNews() {
  try {
    const client = getClient()
    const { data } = await client.raw(GET_NEWS, { first: 50 })
    return data?.nodeNewsItems?.nodes || []
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export default async function NewsPage() {
  const items = await getNews()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-gray-950 leading-[0.9]">
            News
          </h1>
          <p className="text-lg text-gray-400 mt-6 max-w-xl">
            Latest updates from our foundation and the health community.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">News will appear here once content is imported.</p>
            </div>
          ) : (
            <div className="border-t border-gray-200">
              {items.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
