import Link from 'next/link'
import { DrupalNews } from '@/lib/types'

interface NewsCardProps {
  item: DrupalNews
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <Link
      href={item.path || '#'}
      className="group flex items-center justify-between py-6 border-b border-gray-200 transition-all duration-200 hover:pl-1"
    >
      <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
        {item.title}
      </h3>
      <span className="text-sm text-gray-400 shrink-0 ml-4">View</span>
    </Link>
  )
}
