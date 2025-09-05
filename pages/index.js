import Link from 'next/link'
import Layout from '../components/Layout'
import { NAKSHATRAS } from '../lib/nakshatra'

export default function Home(){
  return (
    <Layout>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h1 style={{fontSize:48,margin:0}}>Nakshatra Name Tool</h1>
          <p style={{color:'#555',marginTop:8}}>Explore all Nakshatras, their 4 padas, the recommended syllables and starter name lists.</p>
        </div>
      </header>

      <section style={{marginTop:28}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:16}}>
          {NAKSHATRAS.map(n => (
            <Link key={n.slug} href={`/nakshatra/${n.slug}/pada-1`}>
              <a style={{display:'block',padding:16,borderRadius:8,background:'#fff',boxShadow:'0 6px 18px rgba(16,24,40,0.06)',textDecoration:'none',color:'#111'}}>
                <h3 style={{margin:'0 0 6px 0'}}>{n.name}</h3>
                <div style={{color:'#666',fontSize:13}}>{n.devanagari}</div>
                <div style={{marginTop:10,fontSize:13,color:'#333'}}>{n.description}</div>
                <div style={{marginTop:12,fontSize:13,color:'#0b74de'}}>{n.syllables.join(' · ')}</div>
              </a>
            </Link>
          ))}
        </div>
      </section>

    </Layout>
  )
}
