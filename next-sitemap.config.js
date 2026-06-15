/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedammar.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/contact-success',
    '/booking-success',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api'] },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedammar.com'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Higher priority for key pages
    const priorities = {
      '/': 1.0,
      '/portfolio': 0.9,
      '/services': 0.9,
      '/contact': 0.9,
      '/book-consultation': 0.95,
      '/about': 0.8,
      '/blog': 0.8,
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
