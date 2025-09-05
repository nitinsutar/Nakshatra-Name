import { NAKSHATRAS } from '../../../lib/nakshatra'
import Layout from '../../../components/Layout'

export async function getStaticPaths(){
  const paths = []
  NAKSHATRAS.forEach(n => {
    for(let p=0;p<4;p++) paths.push({ params: { nak: n.slug, pada: String(p+1) } })
  })
  return { paths, fallback:false }
}

export async function getStaticProps({ params }){
  const { nak, pada } = params
  const n = NAKSHATRAS.find(x=>x.slug===nak)
  const padaIdx = Math.max(0, Math.min(3, Number(pada)-1))
  const syll = n.syllables[padaIdx]
  const sampleNames = [ `${syll}an`, `${syll}i`, `${syll}ra`, `${syll}ya`, `${syll}vi` ]
  return { props: { nakName: n.name, devanagari: n.devanagari, pada: padaIdx+1, syllable: syll, sampleNames } }
}

export default function NakPage({ nakName, devanagari, pada, syllable, sampleNames }){
  return (
    <Layout title={`${nakName} — Pada ${pada} (${syllable}) — Baby names`} description={`${nakName} nakshatra pada ${pada} syllable ${syllable} — baby name suggestions`}>
      <h1>{nakName} ({devanagari}) — Pada {pada}</h1>
      <p>Syllable for this pada: <strong>{syllable}</strong></p>
      <h3>Example names</h3>
      <ul>
        {sampleNames.map((n,i)=><li key={i}>{n}</li>)}
      </ul>
      <p><a href="/">Compute for your birth details</a></p>
    </Layout>
  )
}
