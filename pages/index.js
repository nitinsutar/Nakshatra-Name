import { useState } from 'react'
import Layout from '../components/Layout'
import NameSuggestions from '../components/NameSuggestions'

export default function Home(){
  const [form, setForm] = useState({ date:'', time:'', tz:'Asia/Kolkata', place:'Mumbai' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/compute', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify(form)
    })
    const json = await res.json()
    setResult(json)
    setLoading(false)
  }

  return (
    <Layout>
      <h1>Nakshatra Name Tool</h1>
      <p>Enter birth details to compute the Nakshatra, Pada and suggested syllable.</p>
      <form onSubmit={submit} style={{display:'grid',gap:8,maxWidth:420}}>
        <input required placeholder="YYYY-MM-DD" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
        <input required placeholder="HH:MM (24h)" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} />
        <input placeholder="Place (city)" value={form.place} onChange={e=>setForm({...form,place:e.target.value})} />
        <button type="submit" disabled={loading}>{loading? 'Computing...':'Compute syllable'}</button>
      </form>

      {result && (
        <div style={{marginTop:20}}>
          { result.error ? (
            <div style={{color:'red'}}>Error: {result.error}. See README to configure ASTRO_API.</div>
          ) : (
            <div>
              <h2>{result.nakshatraName} — Pada {result.pada+1}</h2>
              <p>Syllable: <strong>{result.syllable}</strong></p>
              <p>Moon longitude: {result.moon_longitude}°</p>
            </div>
          )}
        </div>
      )}

      {result?.syllable && <NameSuggestions syllable={result.syllable} />}
    </Layout>
  )
}
