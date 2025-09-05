import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import BackToTop from './BackToTop'

export default function Layout({ children, title = 'Nakshatra Baby Names', description = 'Explore Nakshatra padas, syllables and curated baby name lists', image }){
  const site = process.env.NEXT_PUBLIC_SITE_URL || ''
  const og = image || `${site}/og/default-og.svg`
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />

        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site} />
        <meta property="og:image" content={og} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nakshatraNames" />
        <link rel="icon" href="/icons/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Load fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="container">
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </div>
      {/* Back to top button - shown via small inline script or hook in app */}
      <div id="backToTop" className="back-to-top">↑</div>
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const btn=document.getElementById('backToTop');
          window.addEventListener('scroll',()=>{ if(window.scrollY>300) btn.classList.add('show'); else btn.classList.remove('show'); });
          btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
        })();
      `}} />
    </>
  )
}
