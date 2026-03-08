import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dcflogistics.gm'

  const routes = [
    { url: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/contact', changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: '/support', changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: '/services', changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: '/services/air-freight', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/services/sea-freight', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/services/road-freight', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/services/customs-clearance', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/services/customs-brokerage', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/services/warehousing', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/services/freight-forwarding', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/services/cross-border-logistics', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/services/haulage-transportation', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/services/logistic-consultancy', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/tracking', changeFrequency: 'daily' as const, priority: 0.7 },
    { url: '/quote', changeFrequency: 'monthly' as const, priority: 0.9 },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}

