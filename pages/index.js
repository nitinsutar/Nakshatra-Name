import Link from 'next/link'
import Layout from '../components/Layout'
import { NAKSHATRAS } from '../lib/nakshatra'
import { useState } from 'react'

export default function Home(){
  const [q,setQ] = useState('')
  const filtered = NAKSHATRAS.filter(n => n.name.toLowerCase().includes(q.toLowerCase()) || n.devanagari.includes(q))
  return (
    <Layout>
      <div className="header">
        <div>
          <h1 style={{fontSize:48,margin:0}}>Nakshatra Name Tool</h1>
          <p style={{color:'#555',marginTop:8}}>Explore all Nakshatras, their 4 padas, the recommended syllables and curated name lists.</p>
        </div>
        <div>
          <input placeholder="Search nakshatra" value={q} onChange={e=>setQ(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid #e6e9ef'}} />
        </div>
      </div>

      <section style={{marginTop:28}}>
        <div className="grid">
          {filtered.map(n => (
            <Link key={n.slug} href={`/nakshatra/${n.slug}/pada-1`}>
              <a className="card">
                <h3 style={{margin:'0 0 6px 0'}}>{n.name}</h3>
                <div className="small">{n.devanagari}</div>
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
