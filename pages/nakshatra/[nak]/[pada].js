import { NAKSHATRAS } from '../../../lib/nakshatra'
import Head from 'next/head'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import SyllableSelector from '../../../components/SyllableSelector'
import NAMES from '../../../lib/names'

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

  const [selectedSyl, setSelectedSyl] = useState(syllable)

  useEffect(()=>{
    try{
      const qp = new URLSearchParams(window.location.search).get('syl')
      if(qp && NAMES[qp]) setSelectedSyl(qp)
    }catch(e){}
  },[])

  function handleSelectSyl(s){
    setSelectedSyl(s)
    try{
      const u = new URL(window.location.href)
      u.searchParams.set('syl', s)
      window.history.replaceState({}, '', u.toString())
    }catch(e){}
  }

  const filtered = useMemo(() => {
    const list = (NAMES[selectedSyl] || [])
    return list.filter(s => {
      if(gender !== 'any' && s.gender && s.gender !== gender) return false
      if(style !== 'any' && s.style && s.style !== style) return false
      if(maxLength && s.name && s.name.length > Number(maxLength)) return false
      return true
    })
  }, [selectedSyl, gender, style, maxLength])

  const ogImage = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/og/${nak.slug}.svg`

// --- Structured data (JSON-LD) for SEO ------------------
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
// Build ItemList with enriched schema for default syllable sample
const itemListElements = (sample || []).slice(0, 20).map((s, idx) => {
  return {
    "@type": "ListItem",
    "position": idx + 1,
    "item": {
      "@type": "Person",
      "name": s.name,
      "alternateName": s.alternateName || '',
      "gender": s.gender || 'Any',
      "description": s.meaning || '',
      "inLanguage": (s.language && s.language[0]) || 'hi',
      "additionalType": "https://schema.org/GivenName",
      "sameAs": s.sameAs || []
    }
  }
})

const pagePath = `${siteUrl}/nakshatra/${nak.slug}/pada-${pada}`
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": `${nak.name} — Pada ${pada} (${syllable}) — Nakshatra Baby Names`,
  "description": `Curated baby names starting with ${syllable} for ${nak.name} (Pada ${pada}).`,
  "url": pagePath,
  "numberOfItems": itemListElements.length,
  "itemListElement": itemListElements
}

// FAQ structured data
const faqJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How are Nakshatras calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nakshatras divide the 360° ecliptic into 27 equal parts (13.333° each). The Moon's longitude at birth determines the Nakshatra. Each Nakshatra is further split into 4 padas (~3.333° each) which map to naming syllables."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Pada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A pada is a quarter of a Nakshatra; it refines the syllable for naming and can slightly change the recommended starting sound."
      }
    }
  ]
}

const ldJson = JSON.stringify(jsonLd)
const ldFaq = JSON.stringify(faqJson)


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
// Build ItemList for the default syllable (server-side sample prop is provided)
const itemListElements = (sample || []).slice(0, 20).map((s, idx) => ({
  "@type": "ListItem",
  "position": idx + 1,
  "item": {
    "@type": "Person",
    "name": s.name,
    "additionalName": s.meaning || '',
    "gender": s.gender || 'Any'
  }
}))

const pagePath = `${siteUrl}/nakshatra/${nak.slug}/pada-${pada}`
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": `${nak.name} — Pada ${pada} (${syllable}) — Nakshatra Baby Names`,
  "description": `Curated baby names starting with ${syllable} for ${nak.name} (Pada ${pada}).`,
  "url": pagePath,
  "numberOfItems": itemListElements.length,
  "itemListElement": itemListElements
}

// FAQ structured data (educational)
const faqJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How are Nakshatras calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nakshatras divide the 360° ecliptic into 27 equal parts (13.333° each). The Moon's ecliptic longitude at birth determines the Nakshatra. Each Nakshatra is further split into 4 padas (~3.333° each) which map to naming syllables."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Pada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A pada is a quarter of a Nakshatra; it refines the syllable for naming and can slightly change the recommended starting sound."
      }
    }
  ]
}

const ldJson = JSON.stringify(jsonLd)
const ldFaq = JSON.stringify(faqJson)

// --- Structured data (JSON-LD) with richer Person fields --------------
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
const itemListElements = (sample || []).slice(0, 50).map((s, idx) => {
  const person = {
    "@type": "Person",
    "name": s.name,
    "gender": s.gender || 'Any',
    "description": s.meaning || '',
    "additionalName": s.alternateName || '',
    "inLanguage": (s.language && s.language[0]) || 'en',
    "additionalType": "https://schema.org/GivenName",
    "sameAs": s.sameAs || []
  }
  return {
    "@type": "ListItem",
    "position": idx + 1,
    "item": person
  }
})

const pagePath = `${siteUrl}/nakshatra/${nak.slug}/pada-${pada}`
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": `${nak.name} — Pada ${pada} (${syllable}) — Nakshatra Baby Names`,
  "description": `Curated baby names starting with ${syllable} for ${nak.name} (Pada ${pada}).`,
  "url": pagePath,
  "numberOfItems": itemListElements.length,
  "itemListElement": itemListElements
}

// FAQ structured data (educational)
const faqJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How are Nakshatras calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nakshatras divide the 360° ecliptic into 27 equal parts (13.333° each). The Moon's ecliptic longitude at birth determines the Nakshatra. Each Nakshatra is further split into 4 padas (~3.333° each) which map to naming syllables."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Pada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A pada is a quarter of a Nakshatra; it refines the syllable for naming and can slightly change the recommended starting sound."
      }
    }
  ]
}

const ldJson = JSON.stringify(jsonLd)
const ldFaq = JSON.stringify(faqJson)

  return (
    <Layout title={`${nak.name} — Pada ${pada} (${selectedSyl})`} description={`${nak.name} nakshatra pada ${pada} syllable ${selectedSyl} — curated baby names`} image={ogImage}>
<Head>
  {/* Canonical URL */}
  <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/nakshatra/${nak.slug}/pada-${pada}`} />
  {/* Per-page structured data */}
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldFaq }} />
</Head>

      <p><Link href='/'><a style={{color:'#0b74de'}}>← All Nakshatras</a></Link></p>
      <h1 style={{fontSize:36}}>{nak.name} <span style={{color:'#666',fontSize:20}}>({nak.devanagari})</span></h1>
      <p className="small">{nak.description}</p>

      <SyllableSelector syllables={nak.syllables} selected={selectedSyl} onSelect={handleSelectSyl} />

      <div style={{marginTop:18,display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
        <div>
          <h2>Pada {pada} — Syllable: <span style={{color:'#0b74de'}}>{selectedSyl}</span></h2>
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

      <h3 style={{marginTop:18}}>Names starting with <span style={{color:'#0b74de'}}>{selectedSyl}</span></h3>

      <ul className="name-list">
        {filtered.map((s,i)=> (
          <li key={i} className="name-item">
            <strong>{s.name}</strong>
            <div className="name-meta">{s.gender || 'any'} • {s.style || 'any'}</div>
            {s.meaning ? <div className="small">Meaning: {s.meaning}</div> : null}
          </li>
        ))}
        {filtered.length===0 && <div className="empty-note">No names found with current filters.</div>}
      </ul>

      <div className="note">
        <strong>About calculations:</strong> Each Nakshatra is 13.33° and each pada ~3.33°. Syllables are assigned per traditional lists; where multiple regional variants exist we show the most common transliteration.
      </div>

    </Layout>
  )
}
