import Head from 'next/head'
export default function Layout({ children, title = 'Nakshatra Name Tool', description = 'Find your baby name syllable from Nakshatra' }){
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{fontFamily:'Inter, system-ui, sans-serif', padding:'24px'}}>
        {children}
      </main>
    </>
  )
}
