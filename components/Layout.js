import Head from 'next/head'
export default function Layout({ children, title = 'Nakshatra Name Tool', description = 'Explore Nakshatra padas, syllables and curated baby name lists' }){
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.vercel.app'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourhandle" />
        <link rel="icon" href="/icons/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        {children}
      </div>
    </>
  )
}
