import axios from 'axios'
import { NAKSHATRAS } from '../../lib/nakshatra'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({error:'only POST allowed'})
  const { date, time, place, tz, lat, lon } = req.body
  const ASTRO_API_URL = process.env.ASTRO_API_URL
  const ASTRO_API_KEY = process.env.ASTRO_API_KEY
  if(!ASTRO_API_URL) return res.status(400).json({ error: 'ASTRO_API_URL not configured. See README.' })

  try{
    // Note: iso uses UTC 'Z' suffix; ensure provider expects UTC or send proper timezone conversion.
    const iso = `${date}T${time}:00Z`
    const providerRes = await axios.post(ASTRO_API_URL, { datetime_iso: iso, lat: lon ? lon : null, lon: lon ? lon : null }, { headers: { 'Authorization': `Bearer ${ASTRO_API_KEY}` } })
    const moon_longitude = providerRes.data.moon_longitude
    if(typeof moon_longitude !== 'number') return res.status(500).json({ error: 'Provider did not return moon_longitude (degrees).' })
    const nak_size = 360/27
    const idx = Math.floor((moon_longitude % 360)/nak_size)
    const deg_into = (moon_longitude % nak_size)
    const pada = Math.floor(deg_into / (nak_size/4))
    const nak = NAKSHATRAS[idx]
    const syllable = nak.syllables[pada]
    return res.json({ nakshatraIndex: idx, nakshatraName: nak.name, pada, syllable, moon_longitude })
  }catch(err){
    console.error(err.message || err)
    return res.status(500).json({ error: 'Failed to compute', details: err.message })
  }
}
