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
        <div className="title">
          <h1 style={{fontSize:44,margin:0}}>Nakshatra Baby Names</h1>
          <p style={{color:'#555',marginTop:8}}>Explore all Nakshatras, their 4 padas, the recommended syllables and curated name lists.</p>
        </div>
        <div>
          <input className="search-input" placeholder="Search nakshatra" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
      </div>

      <section style={{marginTop:28}}>
        <div className="grid">
          {filtered.map(n => (
            <Link key={n.slug} href={`/nakshatra/${n.slug}/pada-1`}>
              <a className="card">
                <h3>{n.name}</h3>
                <div className="dev">{n.devanagari}</div>
                <div className="desc">{n.description}</div>
                <div className="syllables">{n.syllables.map(s=> <span className="syllable-pill" key={s}>{s}</span>)}</div>
              </a>
            </Link>
          ))}
        </div>
      </section>

    </Layout>
  )
}
