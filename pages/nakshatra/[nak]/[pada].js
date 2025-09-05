import { NAKSHATRAS } from '../../../lib/nakshatra'
import NAMES from '../../../lib/names'
import Layout from '../../../components/Layout'
import Link from 'next/link'

export async function getStaticPaths(){
  const paths = []
  NAKSHATRAS.forEach(n => {
    for(let p=1;p<=4;p++) paths.push({ params: { nak: n.slug, pada: `pada-${p}` } })
  })
  return { paths, fallback:false }
}

export async function getStaticProps({ params }){
  const { nak, pada } = params
  const n = NAKSHATRAS.find(x=>x.slug===nak)
  // parse pada like 'pada-2' -> 2
  const m = String(pada).match(/pada-(\d+)/)
  const padaNum = m ? Number(m[1]) : 1
  const padaIdx = Math.max(0, Math.min(3, padaNum-1))
  const syll = n.syllables[padaIdx]
  const sample = NAMES[syll] || []
  return { props: { nak: n, pada: padaIdx+1, syllable: syll, sample } }
}

export default function NakPage({ nak, pada, syllable, sample }){
  return (
    <Layout title={`${nak.name} — Pada ${pada} (${syllable})`}>
      <p><Link href='/'><a style={{color:'#0b74de'}}>← All Nakshatras</a></Link></p>
      <h1 style={{fontSize:36}}>{nak.name} <span style={{color:'#666',fontSize:20}}>({nak.devanagari})</span></h1>
      <p style={{color:'#444'}}>{nak.description}</p>
      <div style={{marginTop:18,display:'flex',gap:12,flexWrap:'wrap'}}>
        {nak.syllables.map((s,i)=> (
          <div key={i} style={{padding:'8px 12px',background: s===syllable?'#0b74de':'#f3f4f6',color: s===syllable? '#fff':'#111', borderRadius:8}}>{s}</div>
        ))}
      </div>

      <h2 style={{marginTop:28}}>Pada {pada} — Syllable: <span style={{color:'#0b74de'}}>{syllable}</span></h2>
      <p style={{color:'#555'}}>Starter name suggestions (seed dataset).</p>

      <ul style={{marginTop:12}}>
        {sample.map((name,i)=> <li key={i} style={{padding:'6px 0'}}>{name}</li>)}
      </ul>

      <div style={{marginTop:24,fontSize:13,color:'#666'}}>
        <strong>About how Nakshatras are calculated</strong>
        <p style={{marginTop:8}}>In Vedic astronomy, the 360° ecliptic (the path of the Moon and Sun) is divided into 27 equal parts called <em>Nakshatras</em>. Each Nakshatra spans exactly 13.333...° (360°/27). The Moon's geocentric ecliptic longitude at the moment of birth determines which Nakshatra it occupies.</p>
        <p>The formula in brief: <code>nak_index = floor( (moon_longitude % 360) / (360/27) )</code>. The index maps to one of the 27 Nakshatras (Ashwini…Revati).</p>

        <strong style={{display:'block',marginTop:12}}>What is a Pada?</strong>
        <p style={{marginTop:8}}>Each Nakshatra is subdivided into 4 equal quarters called <em>padas</em> (each ~3.333...°). The pada determines the specific syllable recommended for naming. The pada index is computed by how far the Moon is into the Nakshatra:</p>
        <p><code>degrees_into_nak = moon_longitude % (360/27)</code><br />
        <code>pada_index = floor(degrees_into_nak / ((360/27)/4))</code></p>

        <strong style={{display:'block',marginTop:12}}>Why syllables sometimes vary</strong>
        <p style={{marginTop:8}}>Different traditional sources use slightly different transliterations or local naming conventions. Also, if the Moon is very close to a Nakshatra boundary, a small error in birth time or timezone can change the Nakshatra/pada — this is why exact time and correct timezone matter. Use this catalog as a canonical guide, and when in doubt consult an accurate ephemeris-based calculation.</p>
      </div>

    </Layout>
  )
}
