import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, title = 'Nakshatra Name Tool', description = 'Explore Nakshatra padas, syllables and curated baby name lists', image }){
  const site = process.env.NEXT_PUBLIC_SITE_URL || ''
  const og = image || `${site}/og/default-og.svg`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site} />
        <meta property="og:image" content={og} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourhandle" />
        <link rel="icon" href="/icons/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}
