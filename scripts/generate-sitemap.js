const fs = require('fs')
const path = require('path')
const { NAKSHATRAS } = require('../lib/nakshatra')
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.vercel.app'

const publicDir = path.join(process.cwd(), 'public')
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })

const staticPages = ['/']
const nakPages = []
NAKSHATRAS.forEach(n=>{
  for(let p=1;p<=4;p++) nakPages.push(`/nakshatra/${n.slug}/pada-${p}`)
})

const urls = staticPages.concat(nakPages).map(u => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
console.log('sitemap.xml written')
