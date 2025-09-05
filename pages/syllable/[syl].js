import Layout from '../../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NAMES from '../../lib/names'
import { useState, useMemo } from 'react'
import Head from 'next/head'

export async function getStaticPaths(){
  const sylls = Object.keys(NAMES)
  const paths = sylls.map(s => ({ params: { syl: s } }))
  return { paths, fallback:false }
}

export async function getStaticProps({ params }){
  const { syl } = params
  const names = NAMES[syl] || []
  return { props: { syl, names } }
}

export default function SyllablePage({ syl, names }){
  const [gender,setGender] = useState('any')
  const [style,setStyle] = useState('any')
  const [maxLength,setMaxLength] = useState(30)

  const filtered = useMemo(()=> {
    return names.filter(s=>{
      if(gender!=='any' && s.gender && s.gender!==gender) return false
      if(style!=='any' && s.style && s.style!==style) return false
      if(maxLength && s.name && s.name.length>Number(maxLength)) return false
      return true
    })
  },[gender,style,maxLength,names])

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const pageUrl = `${siteUrl}/syllable/${syl}`

  const itemListElements = names.slice(0,20).map((s,i)=>({
    "@type":"ListItem",
    "position": i+1,
    "item":{
      "@type":"Person",
      "name": s.name,
      "alternateName": s.alternateName || '',
      "gender": s.gender || 'Any',
      "description": s.meaning || '',
      "inLanguage": (s.language && s.language[0]) || 'hi',
      "additionalType": "https://schema.org/GivenName",
      "sameAs": s.sameAs || []
    }
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Baby Names starting with ${syl}`,
    "description": `Curated Indian baby names starting with syllable ${syl}.`,
    "url": pageUrl,
    "numberOfItems": itemListElements.length,
    "itemListElement": itemListElements
  }

  const ldJson = JSON.stringify(jsonLd)

  return (
    <Layout title={`Baby Names starting with ${syl}`} description={`Curated Indian baby names starting with ${syl}`} image={`${siteUrl}/og/default-og.svg`}>
      <Head>
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson }} />
      </Head>

      <p><Link href='/'><a style={{color:'#0b74de'}}>← All Nakshatras</a></Link></p>
      <h1>Names starting with <span style={{color:'#0b74de'}}>{syl}</span></h1>
      <p className="small">Explore curated baby names beginning with {syl}, as recommended in Vedic naming traditions.</p>

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

      <ul className="name-list">
        {filtered.map((s,i)=>(
          <li key={i} className="name-item">
            <strong>{s.name}</strong>
            <div className="name-meta">{s.gender || 'any'} • {s.style || 'any'}</div>
            {s.meaning ? <div className="small">Meaning: {s.meaning}</div> : null}
          </li>
        ))}
        {filtered.length===0 && <div className="empty-note">No names found.</div>}
      </ul>
    </Layout>
  )
}
