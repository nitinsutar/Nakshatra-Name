import { NAKSHATRAS } from '../../../lib/nakshatra'
import NAMES from '../../../lib/names'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { useState, useMemo } from 'react'

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
  const m = String(pada).match(/pada-(\d+)/)
  const padaNum = m ? Number(m[1]) : 1
  const padaIdx = Math.max(0, Math.min(3, padaNum-1))
  const syll = n.syllables[padaIdx]
  const sample = NAMES[syll] || []
  return { props: { nak: n, pada: padaIdx+1, syllable: syll, sample } }
}

export default function NakPage({ nak, pada, syllable, sample }) {
  const [gender, setGender] = useState('any')
  const [style, setStyle] = useState('any')
  const [maxLength, setMaxLength] = useState(30)

  const filtered = useMemo(() => {
    return sample.filter(s => {
      if(gender !== 'any' && s.gender && s.gender !== gender) return false
      if(style !== 'any' && s.style && s.style !== style) return false
      if(maxLength && s.name && s.name.length > Number(maxLength)) return false
      return true
    })
  }, [sample, gender, style, maxLength])

  const ogImage = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/og/${nak.slug}.svg`

  return (
    <Layout title={`${nak.name} — Pada ${pada} (${syllable})`} description={`${nak.name} nakshatra pada ${pada} syllable ${syllable} — curated baby names`} image={ogImage}>
      <p><Link href='/'><a style={{color:'#0b74de'}}>← All Nakshatras</a></Link></p>
      <h1 style={{fontSize:36}}>{nak.name} <span style={{color:'#666',fontSize:20}}>({nak.devanagari})</span></h1>
      <p className="small">{nak.description}</p>

      <div style={{marginTop:18,display:'flex',gap:12,flexWrap:'wrap'}}>
        {nak.syllables.map((s,i)=> (
          <div key={i} className="syllable-pill" style={{background: s===syllable?undefined:undefined}}>{s}</div>
        ))}
      </div>

      <div style={{marginTop:18,display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
        <div>
          <h2>Pada {pada} — Syllable: <span style={{color:'#0b74de'}}>{syllable}</span></h2>
          <p className="small">Starter curated name suggestions. Use filters to narrow results.</p>
        </div>
        <div className="filters">
          <select className="filter-select" value={gender} onChange={e=>setGender(e.target.value)}>
            <option value="any">Any gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>

          <select className="filter-select" value={style} onChange={e=>setStyle(e.target.value)}>
            <option value="any">Any style</option>
            <option value="traditional">Traditional</option>
            <option value="modern">Modern</option>
            <option value="generated">Generated</option>
          </select>

          <select className="filter-select" value={maxLength} onChange={e=>setMaxLength(e.target.value)}>
            <option value={30}>Any length</option>
            <option value={4}>≤4</option>
            <option value={6}>≤6</option>
            <option value={8}>≤8</option>
          </select>
        </div>
      </div>

      <ul className="name-list">
        {filtered.map((s,i)=> (
          <li key={i} className="name-item">
            <strong>{s.name}</strong> <div className="name-meta">{s.gender || 'any'} • {s.style || 'any'}</div>
            {s.meaning ? <div className="small">Meaning: {s.meaning}</div> : null}
          </li>
        ))}
        {filtered.length===0 && <div className="empty-note">No names found with current filters. Try clearing filters.</div>}
      </ul>

      <div className="note">
        <strong>About calculations:</strong> Each Nakshatra is 13.33° and each pada ~3.33°. Syllables are assigned per traditional lists; where multiple regional variants exist we show the most common transliteration.
      </div>

    </Layout>
  )
}
