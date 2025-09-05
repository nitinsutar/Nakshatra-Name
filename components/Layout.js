import Head from 'next/head'
export default function Layout({ children, title = 'Nakshatra Name Tool', description = 'Explore Nakshatra padas, syllables and sample names' }){
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div style={{fontFamily:'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding:'40px', maxWidth:1100, margin:'0 auto'}}>
        {children}
      </div>
    </>
  )
}
