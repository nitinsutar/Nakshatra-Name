import { NAKSHATRAS } from '../../../lib/nakshatra'
import NAMES from '../../../lib/names'
import Layout from '../../../components/Layout'
import Link from 'next/link'

export async function getStaticPaths(){
  const paths = []
  NAKSHATRAS.forEach(n => {
    for(let p=1;p<=4;p++) paths.push({ params: { nak: n.slug, pada: String(p) } })
  })
  return { paths, fallback:false }
}

export async function getStaticProps({ params }){
  const { nak, pada } = params
  const n = NAKSHATRAS.find(x=>x.slug===nak)
  const padaIdx = Math.max(0, Math.min(3, Number(pada)-1))
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
        <strong>Note:</strong> This is a starter dataset for quick browsing. Later we can add filters (modern/traditional), scripts, pronunciations and an AI-powered name generator.
      </div>

    </Layout>
  )
}
